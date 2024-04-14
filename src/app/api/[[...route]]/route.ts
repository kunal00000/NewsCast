import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { TOPICS } from '@/lib/constants';
import { generateScriptForPodcast } from '@/services/create-podcast';
import { convertScriptToAudio } from '@/services/audio';

const prisma = new PrismaClient().$extends(withAccelerate());

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.use('/*', cors());

app.post('create-episode', async (c)=>{
  const {topic, count} = await c.req.json()
  if(!topic || !count){
    return c.json({message: 'Topic and count are required'}, {status: 400});
  }
  if(!TOPICS.includes(topic)){
    return c.json({message: 'Invalid topic'}, {status: 400});
  }

  const filename = `${topic}-${Date.now()}`;

  const episode = await prisma.episode.create({
    data: {
      filename,
      podcastType: topic as string
    }
  });

  const ssml_script = await generateScriptForPodcast(count, episode.id, topic);

  if(!ssml_script){
    return c.json({message: 'Failed to generate script for podcast'}, {status: 500});
  }

  await convertScriptToAudio(ssml_script, filename, episode.id);

  return c.json({message: 'success', data: episode.id}, {status: 200});
})

app.post('/waitlist', async (c) => {
  const { name, email } = await c.req.json();

  if (!name || !email) {
    return c.json({ message: 'Name and email are required' }, { status: 400 });
  }

  if (await prisma.waitlist.findFirst({ where: { email } })) {
    return c.json({ message: 'User already exists' }, { status: 400 });
  }

  const user = await prisma.waitlist.create({
    data: {
      name,
      email,
    },
  });

  return c.json({ message: 'success', data: user.id }, { status: 200 });
});

export const GET = handle(app);
export const POST = handle(app);
