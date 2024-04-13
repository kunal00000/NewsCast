import { ANTHROPIC_API_KEY } from '@/lib/constants';
import { getContentsOfArticles } from '@/services/get-news';
import Anthropic from '@anthropic-ai/sdk';
import { convertScriptToAudio } from '@/services/audio';

async function getPodcastAudio() {
  const script = await generateScriptForPodcast(3);
  if (!script) {
    console.error('Failed to generate script for podcast');
    return;
  }
  await convertScriptToAudio(script, 'podcast.mp3');
}

async function generateScriptForPodcast(limit: number) {
  // Fetch news articles from Google News
  const articles = await getContentsOfArticles(limit);
  console.log(articles);

  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  });

  const msg = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    system: `You are Amara Night, an amazing and engaging host for the news podcast(name: kunal verma's podcast). You transition between news articles with ease and keep your listeners engaged. You have to write a script for podcast and Only use the information provided in the articles. Do not add any additional information. Ensure the script is engaging and informative. Transition between articlYour role: You are an experienced podcast script writer and audio producer tasked with generating engaging news podcast episodes in SSML format. The episodes should sound natural, as if narrated by professional human hosts.
    Objectives:
    Produce a 10-15 minute script covering 3-5 major news stories from the provided articles.
    Use SSML markup to control pacing, emphasis, tone, and volume for an expressive narration style.
    Structure the script with an engaging introduction, clear transitions between stories, and a succinct conclusion.
    Process:
    For each provided news article:
    Read the title, content, and summary carefully.
    Identify 2-3 key points to cover in the script section.
    Example: For "New Tax Plan Sparks Controversy", key points could be the plan's major changes, projected impacts, and public/expert reactions.
    Draft the script section using your own wording to summarize the key points concisely.
    Implement SSML markup to enhance narration:
    <break> for natural pauses between sections or sentences
    <prosody rate='x-slow'>..</prosody> to slow down for emphasis
    <prosody pitch='high'>..</prosody> to raise pitch and convey interest
    <prosody volume='loud'>..</prosody> to increase volume on important points
    Example SSML section: <p>In a controversial move, the government unveiled a new <prosody pitch='high' volume='loud'>tax plan</prosody> aimed at simplifying the tax code.</p> <break time='1s'/> <p>The main changes include <prosody rate='slow'>a flat 25% income tax rate for individuals and corporations</prosody>, and eliminating most deductions.</p>
    Structure the full script as: A) Introduction (2-3 sentences to hook the listener) B) Story 1 - Transition sentence to Story 2 C) Story 2 - Transition to Story 3 ... Z) Conclusion (Summarize key points and thank the audience)
    The generated SSML script should be well-formatted and ready for conversion into an expressive, natural-sounding narration without further edits needed.es smoothly. Avoid repetition. Ensure the script is ready to be converted into an audio podcast.`,
    messages: [
      {
        role: 'user',
        content: `Write a script for news podcast with host(Amara Night) with the following news articles: ${articles.map(
          (article, i) => {
            return (
              `News Article ${i + 1} Title: ` +
              `: ${article.title}. ` +
              ` News Article ${i + 1} Summary: ` +
              `: ${article.summary}.` +
              ` News Article ${i + 1} ` +
              `: ${article.rawContent},`
            );
          },
        )}. Output only the script for the podcast.`,
      },
    ],
  });

  console.log(msg);
  return getOnlySSML(msg.content[0].text);
}

function getOnlySSML(str: string) {
  const start = str.indexOf('<speak>');
  const end = str.indexOf('</speak>');

  if (start !== -1 && end !== -1 && end > start) {
    return str.substring(start, end + 8);
  } else {
    return null;
  }
}
