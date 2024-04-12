import Card from 'src/components/home/card';
import { DEPLOY_URL } from 'src/lib/constants';
import { Github, Twitter } from 'src/components/shared/icons';
import WebVitals from 'src/components/home/web-vitals';
import ComponentGrid from 'src/components/home/component-grid';
import Image from 'next/image';
import { nFormatter } from 'src/lib/utils';

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    'https://api.github.com/repos/steven-tey/precedent',
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <>
      <div className="z-10 w-full px-5 xl:px-0">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
          <div className="my-auto flex max-w-screen-sm flex-col md:max-w-3xl">
            <h1
              className="animate-fade-up bg-gradient-to-br from-white to-[#5d5d5d] bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-left md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              Your Daily Dose of News, Curated for You
            </h1>
            <p
              className="mt-6 animate-fade-up text-center text-[#726e6e] opacity-0 [text-wrap:balance] md:text-left md:text-3xl"
              style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
            >
              Discover Personalized Audio News Podcasts that Match Your
              Interests with NewsCast.
            </p>

            <div
              className="mx-auto mt-6 flex animate-fade-up space-x-5 opacity-0 md:mx-0"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <a
                className="md:text-md group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-white bg-white px-5 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
                href={DEPLOY_URL}
              >
                <p>Request Access</p>
              </a>
              <a
                className="md:text-md flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-black px-5 py-2 text-sm text-gray-300 shadow-md transition-colors hover:border-gray-50"
                href="/#demo"
              >
                <p>
                  <span>Listen to Demo</span>
                </p>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <img
            src="./hero.webp"
            alt="amara"
            className="my-12 max-h-[36rem] max-w-2xl animate-fade-up select-none md:my-0"
          />
        </div>
      </div>
    </>
  );
}
