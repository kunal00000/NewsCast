import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, GoogleNewsURL, Topic } from '@/lib/constants';
import { load } from 'cheerio';
import prisma from '@/lib/prisma';

export async function getContentsOfArticles(articleLimit: number, topic: Topic, episodeId: number) {
  const articleLinksAndTitles = await fetchTopStoriesFromGoogleNews(
    articleLimit,
    topic,
    episodeId
  );

  const RawArticles = await Promise.all(
    articleLinksAndTitles.map(async (article) => ({
      ...article,
      rawContent: await fetchInnerContent(article.url),
    })),
  );

  const articles = await Promise.all(
    RawArticles.map(async (article) => ({
      ...article,
      summary: await getSummary(article.title, article.rawContent || ''),
    })),
  );

  for(let i=0; i<articles.length; i++){

    const isExist = await prisma.news.findFirst({
      where: {
        url: articles[i].url
      }
    })
    if(isExist) continue;

    await prisma.news.create({
      data:{
        title: articles[i].title,
        content: articles[i].rawContent,
        url: articles[i].url,
        publish_date: articles[i].publish_date,
        source: articles[i].source || '',
        summary: articles[i].summary,
        episodeId,
      }
    })
  }

  return articles;
}

async function getSummary(title: string, rawContent: string) {
  const inputs = {
    input_text: title + ' ' + rawContent,
    max_length: 1024,
  };
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/facebook/bart-large-cnn`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify(inputs),
    },
  );
  const data = await response.json();

  const {
    result: { summary },
  } = data;

  return summary;
}

async function fetchTopStoriesFromGoogleNews(limit: number, topic: Topic, episodeId: number) {
  const response = await fetch(
    GoogleNewsURL[topic],
  );

  const html = await response.text();

  const $ = load(html, { xmlMode: true });

  const articles = $('item')
    .slice(0, limit)
    .map((_, item) => {
      const $item = $(item);
      return {
        title: $item.find('title').text(),
        url: getUrlFromGuid($item.find('guid').text(), $item),
        publish_date: $item.find('pubDate').text(),
        source: $item.find('source').attr('url'),
      };
    })
    .get();

    const inputs = {
      input_text: articles.map((article) => article.title).join(', '),
      max_length: 512,
    };

    const episode_title_res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/facebook/bart-large-cnn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify(inputs),
    })

    const episode_title_data = await episode_title_res.json();

    const episode_title = episode_title_data.result.summary;

    await prisma.episode.update({
      where: {
        id: episodeId
      },
      data: {
        title: episode_title
      }
    })

  return articles;
}

async function fetchInnerContent(url: string) {
  if (!url) throw new Error('URL is missing!');
  if (!isValidUrl(url)) throw new Error('URL is not valid');

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();
    const $ = load(html);

    let content = $('p')
      .map((_, p) => cleanText($(p).text()))
      .get()
      .join(' ');

    if (!content) {
      // If no content was found in <p> tags, fallback to <div> tags
      content = $('div')
        .map((_, div) => cleanText($(div).text()))
        .get()
        .join(' ');
    }

    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

function isValidUrl(urlString: string) {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}

function cleanText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function getUrlFromGuid(guid: string, $item: any): string {
  try {
    const decodedString = atob(guid);

    var urlRegex = /https?:\/\/[^\s]+(?=Ò)/g;
    const urlMatch = decodedString.match(urlRegex);
    if (!urlMatch) return $item.find('link').text();

    return urlMatch[0];
  } catch (error) {
    return $item.find('link').text();
  }
}
