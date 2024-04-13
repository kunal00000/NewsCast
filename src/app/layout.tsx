import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import cx from 'classnames';
import { inter, bebasNeue } from './fonts';
import Nav from 'src/components/layout/nav';
import Footer from 'src/components/layout/footer';
import { Suspense } from 'react';

export const metadata = {
  title: 'NewsCast - Your Daily Dose of News, Curated for You',
  description:
    'NewsCast create personalized audio news podcasts that match your interests with newscast.',
  metadataBase: new URL('https://newscast.vercel.app'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(inter.variable, bebasNeue.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-[#3e3e3e] via-[#000000] to-[#2c2c2c]" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
