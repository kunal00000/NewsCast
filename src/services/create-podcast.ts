import { ANTHROPIC_API_KEY, CLOUDFLARE_R2_MEDIA_SUBDOMAIN, PODCAST, Topic } from '@/lib/constants';
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
    system: `You are Amara Night, an amazing and engaging host for the news podcast. You transition between news articles with ease and keep your listeners engaged. You have to write a script for podcast and Only use the information provided in the articles. Do not add any additional information. Ensure the script is engaging and informative. Transition between articles smoothly. Avoid repetition. Ensure the script is ready to be converted into an audio podcast.

    Be creative and make the audio as engaging and natural-sounding as possible.
    
    Here's an example SSML script for a positive technology news article:
      <speak> <par> <media xml:id="intro" soundLevel="-3dB"> <audio src="intro.mp3"> <desc>Intro music</desc> </audio> </media> <media xml:id="host_intro" begin="intro.end-1s"> <speak> <prosody rate="90%" pitch="+10%" volume="loud"> What's up tech junkies? </prosody> <break time="0.5s"/> <prosody rate="95%" pitch="+5%"> This is Amara Night and you're tuned in to another insightful episode of Tech Beats, bringing you the hottest news from the world of technology. </prosody> <break time="1s"/> Get those earbuds locked and loaded because we've got a doozy of a lineup for you today. Let's dive right in! </speak> </media> </par> <par> <media xml:id="transition" soundLevel="-1dB"> <audio src="transition.mp3"> <desc>Transition sound effect</desc> </audio> </media> <media xml:id="news1" begin="transition.end"> <speak> <prosody rate="95%"> First up, it appears some juicy details on Apple's highly anticipated M4 chip may have been leaked. MacRumors has the scoop on the purported roadmap, which indicates the M4 chip will power several new Mac models set for release later this year. We're also reportedly getting new iPad models as soon as the second week of May. </prosody> <break time="0.5s"/> </speak> </media> </par> <par> <media xml:id="transition2" soundLevel="-1dB"> <audio src="transition.mp3"> <desc>Transition sound effect</desc> </audio> </media> <media xml:id="news2" begin="transition2.end"> <speak> <prosody rate="100%" pitch="+10%"> In other news, it seems the newly launched Humane AI Pin is already facing some harsh criticism and negative reviews. The device, meant to function as a personal AI assistant, is being called half-baked by some early users according to a report from Decrypt. </prosody> <break time="0.5s"/> </speak> </media> </par>
      (continue more news articles if any)
      <prosody rate="95%" pitch="+10%"> And that's a wrap for today's episode of Tech Beats! </prosody> <break time="0.5s"/> <prosody rate="90%"> I hope you found these stories as riveting as I did, Be sure to tune in next week as we continue bringing you all the latest buzz from Silicon Valley and beyond. </prosody> <break time="0.5s"/> <prosody rate="95%" pitch="+5%"> Until next time, keep those devices charged and your curiosity sparked! </prosody> <break time="0.5s"/> This is Amara Night, signing off. <break time="0.1s"/> <audio src="outro.mp3"> <desc>Outro music</desc> </audio> </speak> `,
    messages: [
      {
        role: 'user',
        content: `Here are required details for podcast episode:
        - Podcast name: ${podcast_name}
        - Host name: ${hostname}
        ${articles.map((article, i) => {
          return (`News Article ${i + 1} Title: ${article.title}. 
                   News Article ${i + 1} Summary: ${article.summary},`);
        }).join("\n")}`,
      },
    ],
  });

  console.log(msg);
  return correctSources(getOnlySSML(msg.content[0].text) || '');
}

function getOnlySSML(str: string) {
  const start = str.indexOf('<speak>');
  const end = str.lastIndexOf('</speak>');

  if (start !== -1 && end !== -1 && end > start) {
    return str.substring(start, end + 8);
  } else {
    return null;
  }
}

function correctSources(text: string) {
  const toRemove = [
    `src="intro.mp3"`,
    `src="transition.mp3"`,
    `src="outro.mp3"`,
  ];
  const toAdd = [
    `src="${CLOUDFLARE_R2_MEDIA_SUBDOMAIN}/intro.mp3"`,
    `src="${CLOUDFLARE_R2_MEDIA_SUBDOMAIN}/transition.mp3"`,
    `src="${CLOUDFLARE_R2_MEDIA_SUBDOMAIN}/outro.mp3"`,
  ];

  let newText = text;

  for (let i = 0; i < toRemove.length; i++) {
    newText = newText.replace(toRemove[i], toAdd[i]);

    if (newText.includes(toRemove[i])) {
      i = i - 1;
    }
  }
  console.log(newText);
  return newText;
}

