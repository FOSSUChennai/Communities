import type { Metadata } from 'next';

import Community from '@/components/pages/Communities/Community';
import { generateMetadata, Page } from '@/components/shared/utils/metadata';

export const metadata: Metadata = generateMetadata(Page.COMMUNITIES);

export default function Communities() {
  return (
    <>
      <Community />
    </>
  );
}
