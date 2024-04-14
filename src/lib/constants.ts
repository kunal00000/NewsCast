export const DEPLOY_URL = `https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent&project-name=precedent&repository-name=precedent&demo-title=Precedent&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https%3A%2F%2Fprecedent.dev&demo-image=https%3A%2F%2Fprecedent.dev%2Fopengraph-image&env=GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent%2Fblob%2Fmain%2F.env.example&stores=%5B%7B"type"%3A"postgres"%7D%5D`;

export const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
export const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
export const CLOUDFLARE_R2_BUCKET_NAME= process.env.CLOUDFLARE_R2_BUCKET_NAME;
export const CLOUDFLARE_R2_SECRET_KEY= process.env.CLOUDFLARE_R2_SECRET_KEY;
export const CLOUDFLARE_R2_ACCESS_KEY= process.env.CLOUDFLARE_R2_ACCESS_KEY;
export const CLOUDFLARE_R2_ENDPOINT= process.env.CLOUDFLARE_R2_ENDPOINT;
export const CLOUDFLARE_R2_MEDIA_SUBDOMAIN= process.env.CLOUDFLARE_R2_MEDIA_SUBDOMAIN;

export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export const TOPICS = ['business', 'health', 'sports', 'tech', 'world', 'local_us'];
export const PODCAST = {
  'business':'Business Beats',
  'health':'Wellness & Health',
  'sports':'The Sports Desk',
  'tech': 'Tech Talks',
  'world': 'Worldly Whispers',
  'local_us': 'Local US News',
}

export type Topic = 'business' | 'health' | 'sports' | 'tech' | 'world' | 'local_us';

export const GoogleNewsURL = {
  'world':'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en',
  'business':'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en',
  'health':'https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-US&gl=US&ceid=US:en',
  'sports':'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en',
  'tech':'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en',
  'local_us':'https://news.google.com/rss/topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE/sections/CAQiW0NCSVNQam9JYkc5allXeGZkakpDRUd4dlkyRnNYM1l5WDNObFkzUnBiMjV5RHhJTkwyY3ZNVEZqTkRWNlgyaGpNbm9QQ2cwdlp5OHhNV00wTlhwZmFHTXlLQUEqNggAKjIICiIsQ0JJU0d6b0liRzlqWVd4ZmRqSjZEd29OTDJjdk1URmpORFY2WDJoak1pZ0FQAVAB?hl=en-US&gl=US&ceid=US:en'
}
