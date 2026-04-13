import type { Metadata } from 'next';

// ? A small util function to generate metadata dynamically for each routes.
// Add more parameters as needed.
// ! In future, if required, use the actual `generateMetadata` function by Next JS - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export function generateMetadata(page: Page): Metadata {
  const metaConfig = Metaconfig[page];

  return {
    title: metaConfig.title,
    description:
      'Explore developer communities, meetups, and tech events across Tamil Nadu including Chennai and Coimbatore.'
  };
}

export enum Page {
  HOME,
  COMMUNITIES,
  ARCHIVE
}

export const Metaconfig = {
  [Page.HOME]: {
    title: 'Tech Communities in Tamil Nadu | FOSS Chennai'
  },
  [Page.COMMUNITIES]: {
    title: 'Communities | TamilNadu Tech Community'
  },
  [Page.ARCHIVE]: {
    title: 'Archive | TamilNadu Tech Community'
  }
};
