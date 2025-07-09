import type { Metadata } from 'next';
import Archive from '@/components/pages/Archive/archive';
import { generateMetadata, Page } from '@/components/shared/utils/metadata';

export const metadata: Metadata = generateMetadata(Page.ARCHIVE);

export default function Communities() {
  return (
    <>
      <Archive />
    </>
  );
}
