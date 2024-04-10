import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.use('/*', cors());

app.get('/', async (c) => {
  return c.json({ message: 'Hello, World!' }, { status: 200 });
});

export const GET = handle(app);
// export default app as never;
