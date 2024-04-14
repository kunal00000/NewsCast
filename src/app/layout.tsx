import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import { inter, bebasNeue } from './fonts';
import Nav from 'src/components/layout/nav';
import Footer from 'src/components/layout/footer';
import { Suspense } from 'react';
import { LoadingCircle} from '@/components/shared/icons';

export const metadata = {
  title: 'NewsCast - Your Daily Dose of News, Curated for You',
  description:
    'NewsCast create personalized audio news podcasts that match your interests with newscast.',
  metadataBase: new URL('https://newscast.pages.dev'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, bebasNeue.variable)}>
        <div className="fixed min-h-screen h-full w-full bg-gradient-to-br from-[#4c4c4c] via-[#000000] to-[#3b3b3b]"/>
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
