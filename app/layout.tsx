import type { Metadata } from 'next';
import { DM_Sans, Syne } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BrandME • Your Brand • Your Web.',
  description:
    'BrandME builds fast, clean and professional websites for small businesses and brands in 7 days or less.',
  keywords: ['build a website for your brand', 'web design for SMEs', 'fast website delivery', 'done for you web design'],
  icons: {
    icon: '/images/logo/brandme-favicon.ico',
    shortcut: '/images/logo/brandme-icon.svg',
  },
  openGraph: {
    title: 'BrandME • Your Brand • Your Web.',
    description: 'A done-for-you web design platform built for SMEs, businesses and emerging brands.',
    url: 'https://brandme.ng',
    siteName: 'BrandME',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
