import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { IS_PROD, SITE_URL } from '../lib/constants';
import UmamiProvider from 'next-umami';
import Header from '../components/shared/header';
import Footer from '../components/shared/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

// Inter was imported from the globals.css file, but we can also import it here so the the render block won't happen.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  //adding the head props from below to here ( the next will take care from here )
  icons: {
    icon: '/favicon.ico'
  },
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webId = process.env.UMAMI_ANALYTICS_ID;
  return (
    <html lang='en'>
      {/* removed the head tag, next will add it automatically ( LCP from above 2.5 to below 2.5  ) - adding head manually will be like overriding or bypassing the optimized head from next */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} mx-auto max-w-[1120px] bg-[#fafafa] antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
      {IS_PROD && <UmamiProvider websiteId={webId} />}
    </html>
  );
}
