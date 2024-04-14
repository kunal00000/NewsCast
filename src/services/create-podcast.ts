import { ANTHROPIC_API_KEY, PODCAST, Topic } from '@/lib/constants';
import { getContentsOfArticles } from '@/services/get-news';
import Anthropic from '@anthropic-ai/sdk';

export async function generateScriptForPodcast(limit: number, episodeId:number, topic:Topic) {
  // Fetch news articles from Google News
  const articles = await getContentsOfArticles(limit, topic, episodeId);
  console.log(articles);

  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  });

  const podcast_name = PODCAST[topic];

  const hostname = 'Amara Night';

  const msg = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1536,
    system: `As an experienced podcast script writer and audio producer tasked with generating engaging ${topic} news podcast episodes in SSML format. The episodes should sound natural, as if narrated by professional human hosts.
    Your primary task is to create a script for ${podcast_name} news podcast episode covering news stories from the provided articles with an energetic host ${hostname}. 
    The script should be structured with an engaging, energetic introduction, clear transitions between stories, and a succinct conclusion. Use SSML markup to control pacing, emphasis, tone, and volume for an expressive narration style.
    Use SSML markup to control pacing, emphasis, tone, and volume for an expressive narration style.
    Structure the script with an engaging introduction, clear transitions between stories, and a succinct conclusion.
    Process:
    For each provided news article:
    1. News Article Breakdown: meticulously analyze each provided article (articles) - title, summary, and content. 
    2. Key Point Extraction: For each story, identify all captivating points to capture your audience's attention. (e.g., "New Tax Plan Sparks Controversy": key points - plan's key changes, potential impacts, reactions)
    3. Scriptwriting with SSML: Using your knowledge of natural language and storytelling, you'll craft a captivating script that summarizes the key points concisely and engagingly. You'll leverage SSML tags (<break>, <prosody>) to add vocal variety for an energetic and informative delivery.
    Implement SSML markup to enhance narration:
    <break> for natural pauses between sections or sentences
    <prosody rate='x-slow'>..</prosody> to slow down for emphasis
    <prosody pitch='high'>..</prosody> to raise pitch and convey interest
    <prosody volume='loud'>..</prosody> to increase volume on important points
    Example SSML section: <p>In a controversial move, the government unveiled a new <prosody pitch='high' volume='loud'>tax plan</prosody> aimed at simplifying the tax code.</p> <break time='1s'/> <p>The main changes include <prosody rate='slow'>a flat 25% income tax rate for individuals and corporations</prosody>, and eliminating most deductions.</p>
    Structure the full script as: A) Introduction (2-3 sentences to hook the listener) B) Story 1 - Transition sentence to Story 2 C) Story 2 - Transition to Story 3 ... Z) Conclusion (Summarize key points and thank the audience)
    The generated SSML script should be well-formatted and ready for conversion into an expressive, natural-sounding narration without further edits needed. Avoid repetition. Ensure the output is ready to be converted into an audio podcast.`,
    messages: [
      {
        role: 'user',
        content: `Here are the ${topic} news articles for "${podcast_name}" podcast episode:
        ${articles.map((article, i) => {
          return (`News Article ${i + 1} Title: ${article.title}. 
                   News Article ${i + 1} Summary: ${article.summary}. 
                   News Article ${i + 1} Content: ${article.rawContent}`);
        }).join("\n\n")}
        My energetic host's name is ${hostname}.`,
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
