import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

// ? A small util function to generate metadata dynamically for each routes.
// Add more parameters as needed.
// ! In future, if required, use the actual `generateMetadata` function by Next JS - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export function generateMetadata(page: Page): Metadata {
  const metaConfig = Metaconfig[page];

  return {
    title: metaConfig.title,
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
      canonical: metaConfig.canonical
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
}

export enum Page {
  HOME,
  COMMUNITIES,
  ARCHIVE
}

export const Metaconfig = {
  [Page.HOME]: {
    canonical: '',
    title: 'TamilNadu Tech Community'
  },
  [Page.COMMUNITIES]: {
    canonical: '/Communities',
    title: 'Communities | TamilNadu Tech Community'
  },
  [Page.ARCHIVE]: {
    canonical: '/archive',
    title: 'Archive | TamilNadu Tech Community'
  }
};
