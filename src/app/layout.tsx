import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { IS_PROD, SITE_URL } from '../lib/constants';
import UmamiProvider from 'next-umami';
import { ResizableNavbar } from '../components/shared/resizable-header';
import Footer from '../components/shared/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'TamilNadu Tech Community',
  description:
    'Never miss an event from your favourite Tech Commnuity in Tamil Nadu. Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu. Stay updated with the latest technology events, workshops, and hackathons in Chennai, Coimbatore, Madurai and more.',
  keywords:
    'tamil nadu tech events, developer conferences tamil nadu, tech meetups chennai, developer events chennai, tamil nadu developer community, tech conferences india, technology events chennai, developer workshops tamil nadu, tech community events, coding meetups chennai',
  openGraph: {
    title: 'Tamil Nadu Tech Events & Developer Conferences | TN Tech Community',
    description:
      'Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu. Stay updated with the latest technology events, workshops, and hackathons.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Tamil Nadu Tech Events'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamil Nadu Tech Events & Developer Conferences',
    description:
      'Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu.'
  },
  alternates: {
    canonical: SITE_URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  metadataBase: new URL(SITE_URL)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webId = process.env.UMAMI_ANALYTICS_ID;
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-[1120px] bg-[#fafafa] antialiased`}
      >
        <ResizableNavbar />
        <div className='pt-20'>{children}</div>
        <Footer />
      </body>
      {IS_PROD && <UmamiProvider websiteId={webId} />}
    </html>
  );
}
