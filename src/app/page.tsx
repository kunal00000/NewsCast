import { ExpandingArrow } from '@/components/shared/icons';
import Waitlist from '@/components/home/waitlist';
import Image from 'next/image';
import Link from 'next/link';
import { PODCAST, TOPICS, Topic } from '@/lib/constants';

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full px-5 xl:px-0">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
          <div className="my-auto flex max-w-screen-sm flex-col text-center md:max-w-3xl">
            <h1
              className="animate-fade-up bg-gradient-to-br from-white to-[#757575] bg-clip-text font-oswald text-4xl font-medium tracking-normal text-transparent opacity-0 drop-shadow-sm  [text-wrap:balance] md:text-left md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              Your Daily Dose of News, Curated for You
            </h1>
            <p
              className="mt-6 animate-fade-up  font-oswald text-white/50 opacity-0 [text-wrap:balance] md:text-left md:text-3xl"
              style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
            >
              Discover Audio News Podcasts that Match Your
              Interests with NewsCast.
            </p>

            <div
              className="mx-auto mt-6 flex animate-fade-up space-x-5 font-bold opacity-0 md:mx-0"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <Link
                className="md:text-md group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-white bg-white px-5 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
                href={'#join-waitlist'}
              >
                <p>Get Access</p>
              </Link>
              <Link
                className="md:text-md flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-black px-5 py-2 text-sm text-gray-300 shadow-md transition-colors hover:border-gray-50"
                href="/#demo"
              >
                Listen to Demo
                <ExpandingArrow />
              </Link>
            </div>
          </div>
          <Image
            src="/hero.webp"
            width={600}
            height={800}
            layout='responsive'
            alt="hero image of a person listening to a podcast on a phone"
            className="my-12 max-h-[36rem] max-w-[38rem] animate-fade-up select-none drop-shadow-[0_0px_7px_rgba(200,200,200,0.8)] md:my-0"
          />
        </div>

        {/* DEMO */}
        <div id="demo" className="mb-32" />
        <div className="space-y-4 text-center font-oswald md:mt-48">
          <p className="bg-gradient-to-br from-white to-[#757575] bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent drop-shadow-sm [text-wrap:balance] md:text-sm">
            Hear It for Yourself
          </p>
          <h2 className="bg-gradient-to-br from-white to-[#757575] bg-clip-text text-3xl text-transparent drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem]">
            Experience NewsCast in Action
          </h2>
          <p className="text-md mx-auto mt-4 max-w-2xl tracking-wider text-white/50 md:text-lg">
            Tune in to these sample of our audio podcasts for the
            latest news in these category.
          </p>
        </div>
        
        {
          <div className="mx-auto flex flex-row flex-wrap  justify-evenly md:max-w-4xl">
            {TOPICS.map((topic) => (
              <Link key={topic} href={`/podcast/${topic}`}>
                <div className="relative col-span-1 mx-auto my-8 md:min-w-96 min-w-80 rounded-lg bg-gradient-to-br from-white/40 via-white/25 to-white/40 p-4 shadow-md shadow-white/40 backdrop-blur-xl duration-300 hover:scale-[104%]">
                  <p className="bg-gradient-to-br from-white to-[#757575] bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent drop-shadow-sm [text-wrap:balance]">
                    {topic} News
                  </p>
                  <div className="mt-2 mb-4 text-center">
                    <h3 className="text-2xl font-oswald text-white/50 md:text-3xl">
                      {PODCAST[topic as Topic]}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        }
          

        {/* Waitlist */}
        <div id="join-waitlist" className="mb-32" />
        <div className="space-y-4 text-center md:mt-48">
          <p className="bg-gradient-to-br from-white to-[#757575] bg-clip-text font-oswald text-xs font-bold uppercase tracking-widest text-transparent drop-shadow-sm [text-wrap:balance] md:text-sm">
            Get Early Access
          </p>
          <h2 className="bg-gradient-to-br from-white to-[#757575] bg-clip-text font-oswald text-3xl text-transparent drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem]">
            Join the Waitlist
          </h2>
          <p className="text-md mx-auto mt-4 max-w-2xl font-oswald tracking-wider text-white/50 md:text-lg">
            Join waitlist to be notified when NewsCast is available for you.
          </p>

          <Waitlist />
        </div>
      </div>
    </>
  );
}
