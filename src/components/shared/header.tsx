'use client';
import Link from 'next/link';
import GitHubButton from '../github-button';
import { RssSimple } from '@phosphor-icons/react';

export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between bg-gray-50 px-4 py-4 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 md:px-8 lg:px-16'>
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        tamilnadu.tech
      </Link>
      <div className='flex h-full items-center space-x-4'>
        <GitHubButton />
        <Link
          href='/rss'
          className='inline-flex items-center rounded-lg px-4 py-2 text-sm shadow transition duration-200 hover:text-gray-700'
          target='_blank'
        >
          <RssSimple size={24} />
        </Link>
      </div>
    </nav>
  );
}
