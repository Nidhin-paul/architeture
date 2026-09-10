import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '../components/common/SmoothScroll';
import CustomCursor from '../components/common/CustomCursor';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: '/icon.svg',
  },
  title: 'Atelier Vanguard | International Architectural Practice',
  description:
    'Award-winning architectural studio dedicated to monumental brutalist residences, cultural institutions, and enduring spatial experiences.',
  openGraph: {
    title: 'Atelier Vanguard | International Architectural Practice',
    description:
      'Award-winning architectural studio dedicated to monumental brutalist residences, cultural institutions, and enduring spatial experiences.',
    url: 'https://ateliervanguard.com',
    siteName: 'Atelier Vanguard',
    images: [
      {
        url: '/images/hero/hero-building.jpg',
        width: 1920,
        height: 1080,
        alt: 'Atelier Vanguard Luxury Modern Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#F9F8F6] text-[#141414] selection:bg-[#9E7D47] selection:text-white font-sans antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
