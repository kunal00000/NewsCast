import { DEPLOY_URL } from 'src/lib/constants';
import AudioPlayer from '@/components/home/audio-player';

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full px-5 xl:px-0">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
          <div className="my-auto flex max-w-screen-sm flex-col md:max-w-3xl">
            <h1
              className="animate-fade-up bg-gradient-to-br from-white to-[#757575] bg-clip-text text-center font-oswald text-4xl font-medium tracking-normal text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-left md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              Your Daily Dose of News, Curated for You
            </h1>
            <p
              className="mt-6 animate-fade-up text-center text-white/50 opacity-0 [text-wrap:balance] md:text-left md:text-3xl"
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
            className="my-12 max-h-[36rem] max-w-2xl animate-fade-up select-none drop-shadow-[0_0px_7px_rgba(200,200,200,0.8)] md:my-0"
          />
        </div>

        {/* DEMO */}
        <div className="mt-48 space-y-4 text-center font-oswald">
          <p className="bg-gradient-to-br from-white to-[#757575] bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent drop-shadow-sm [text-wrap:balance] md:text-sm">
            Hear It for Yourself
          </p>
          <h2 className="bg-gradient-to-br from-white to-[#757575] bg-clip-text text-3xl text-transparent drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem]">
            Experience NewsCast in Action
          </h2>
          <p className="text-md mx-auto mt-4 max-w-2xl tracking-wider text-white/50 md:text-lg">
            Tune in to this sample of our personalized audio podcast for the
            latest tech news.
          </p>
        </div>
        <AudioPlayer
          episodeTitle="Latest in Tech News"
          episodeNumber="01"
          src="./output1.mp3"
        />
      </div>
    </>
  );
}
