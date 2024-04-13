import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.use('/*', cors());

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
// export default app as never;
