'use client';
import Link from 'next/link';
import GitHubButton from '../github-button';
import { RssSimple } from '@phosphor-icons/react';

export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        tamilnadu.tech
      </Link>
      <div className='flex h-full items-center space-x-4'>
        <GitHubButton />
         {/* ✅ New Wiki Link */}
        <a
          href='https://wiki.tamilnadu.tech'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center rounded-lg px-4 py-2 text-sm text-black shadow transition duration-200 hover:text-gray-700'
        >
          Wiki
        </a>
        <Link
          href='/rss'
          className='inline-flex items-center rounded-lg px-4 py-2 text-sm text-black shadow transition duration-200 hover:text-gray-700'
          target='_blank'
        >
          <RssSimple size={24} />
        </Link>
      </div>
    </nav>
  );
}
