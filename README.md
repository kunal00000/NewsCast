<img width="1424" alt="NewsCast – daily audio news podcasts" src="https://github.com/kunal00000/NewsCast/assets/92316166/b5335bd9-01f1-42f8-9ec6-e66732738f0f">

<a href="https://newscast.pages.dev">
  <h1 align="center">NewsCast</h1>
</a>

<p align="center">
  NewsCast – Daily Audio News Podcasts
</p>

<p align="center">
  <a href="https://twitter.com/kunalvermax">
    <img src="https://img.shields.io/twitter/follow/kunalvermax?style=flat&label=kunalverma&logo=twitter&color=0bf&logoColor=fff" alt="Kunal Verma Twitter follower count" />
  </a>
</p>
<br/>

## Introduction
NewsCast creates Audio News Podcasts that match your interests. <br/>
This app tackles these problems:
- **Information Overload**: By curating and summarizing news articles based on user interests, the app helps users avoid information overload and focus on the topics that truly matter to them.

- **Accessibility**: Converting news content into an audio format allows users to consume information while multitasking, such as during their commute, workout, or household chores, making it easier to stay informed without sacrificing productivity.

## Tech Stack

**Frameworks**

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js

**Platforms**

- [Cloudflare Pages](https://www.cloudflare.com) – Easily preview & deploy changes with git
- [Cloudflare Workers AI](https://www.cloudflare.com) - Run machine learning models, powered by serverless GPUs
- [Cloudflare R2](https://www.cloudflare.com) - Object Storage 
- [Vercel Postgres](https://vercel.com/postgres) – Serverless Postgres at the Edge

**UI**

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience

**Code Quality**

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

## Development
- Install dependencies using `pnpm install`
- Fill all the required environment variables mentioned in `.env.example`
- Sync your database by running the command `npx prisma db push` & `npx prisma generate --no-engine`
- Start the development server using `pnpm dev`

You are good to go now!

## Author

- Kunal Verma ([@kunalvermax](https://twitter.com/kunalvermax))
