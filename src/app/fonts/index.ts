import localFont from 'next/font/local';
import { Inter, Oswald } from 'next/font/google';

export const sfPro = localFont({
  src: './SF-Pro-Display-Medium.otf',
  variable: '--font-sf',
});

export const bebasNeue = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
