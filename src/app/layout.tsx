import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { IS_PROD } from '../lib/constants';
import UmamiProvider from 'next-umami';
import Header from '../components/shared/header';
import Footer from '../components/shared/footer';
import { generateMetadata, Page } from '@/components/shared/utils/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = generateMetadata(Page.HOME);

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webId = process.env.UMAMI_ANALYTICS_ID;

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TamilNadu Tech',
    url: 'https://tamilnadu.tech/',
    logo: 'https://tamilnadu.tech/favicon.ico',
    sameAs: ['https://github.com/fossuchennai/communities'],
    description:
      'Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu. We host regular meetups, workshops, and code sprints to unite Java, Kotlin, Python, React, Flutter and other tech communities.',
    foundingDate: '2025-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://tamilnadu.tech/'
    }
  };

  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='theme-color' content='#fafafa' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-[1120px] bg-[#fafafa] antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
      {IS_PROD && <UmamiProvider websiteId={webId} />}
    </html>
  );
}
