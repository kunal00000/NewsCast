import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import { inter, bebasNeue } from './fonts';
import Nav from 'src/components/layout/nav';
import Footer from 'src/components/layout/footer';
import { Suspense } from 'react';
import { LoadingCircle} from '@/components/shared/icons';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NewsCast - Daily Audio News Podcasts",
  description: "NewsCast create audio news podcasts that match your interests.",
  openGraph: {
    images: [
      {
        url: "https://newscast.pages.dev/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "NewsCast",
    title: "NewsCast - Daily Audio News Podcasts",
    description: "NewsCast create audio news podcasts that match your interests.",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://newscast.pages.dev",
    creator: "@kunalvermax",
    description: "NewsCast create audio news podcasts that match your interests.",
    images: [
      {
        url: "https://newscast.pages.dev/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="og:image"
          content="https://newscast.pages.dev/og-image.png"
        />
      </head>
      <body className={cn(inter.variable, bebasNeue.variable)}>
        <div className="fixed min-h-screen h-full w-full bg-gradient-to-br from-[#480d88e8] via-[#1b012f] to-[#4a1b7cdc]"/>
        <svg
            className='absolute inset-0 z-10 h-full w-full stroke-purple-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
            aria-hidden='true'
          >
            <defs>
              <pattern
                id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
                width={200}
                height={200}
                x='50%'
                y={-1}
                patternUnits='userSpaceOnUse'
              >
                <path d='M.5 200V.5H200' fill='none' />
              </pattern>
            </defs>
            <rect
              width='100%'
              height='100%'
              strokeWidth={0}
              fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
            />
          </svg>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          <Suspense fallback={<LoadingCircle />}>
            {children}
          </Suspense>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
