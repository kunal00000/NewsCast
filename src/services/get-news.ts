import { CF_ACCOUNT_ID, CF_API_TOKEN } from '@/lib/constants';
import { load } from 'cheerio';

export async function getContentsOfArticles(articleLimit: number) {
  const articleLinksAndTitles = await fetchTopStoriesFromGoogleNews(
    articleLimit,
  );

  const RawArticles = await Promise.all(
    articleLinksAndTitles.map(async (article) => ({
      ...article,
      rawContent: await fetchInnerContent(article.url),
    })),
  );

  return await Promise.all(
    RawArticles.map(async (article) => ({
      ...article,
      summary: await getSummary(article.title, article.rawContent || ''),
    })),
  );
}

async function getSummary(title: string, rawContent: string) {
  const inputs = {
    input_text: title + ' ' + rawContent,
    max_length: 512,
  };
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/facebook/bart-large-cnn`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CF_API_TOKEN}`,
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

async function fetchTopStoriesFromGoogleNews(limit: number) {
  const response = await fetch(
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en',
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

  // console.log(articles);
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
    const decodedString = window.atob(guid);

    var urlRegex = /https?:\/\/[^\s]+(?=Ò)/g;
    const urlMatch = decodedString.match(urlRegex);
    if (!urlMatch) return $item.find('link').text();

    return urlMatch[0];
  } catch (error) {
    return $item.find('link').text();
  }
}
