'use client';
import Link from 'next/link';
import Image from 'next/image';
import GitHubButton from '../github-button';
import PushSubscribe from '../PushSubscribe';
import Logo from '../../../public/logo.webp';
import Icon from '../../app/favicon.ico';
import { RssSimple } from '@phosphor-icons/react';

export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between bg-[#fafafa] px-2 py-3 text-black sm:px-4 sm:py-4 md:px-8 lg:px-16'>
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        {/* Show full logo on sm+ screens */}
        <span className='hidden sm:inline'>
          <Image
            src={Logo}
            alt='Tamil Nadu Tech Logo'
            width={400}
            height={69}
            className='h-8 w-auto sm:h-10 lg:h-12'
          />
        </span>
        {/* Show compact icon on mobile */}
        <span className='inline sm:hidden'>
          <Image src={Icon} alt='Tamil Nadu Tech Icon' width={32} height={32} className='h-8 w-8' />
        </span>
      </Link>

      <div className='flex h-full items-center space-x-3 sm:space-x-4'>
        {/* PushSubscribe: smaller icon on mobile */}
        <span className='flex sm:hidden'>
          <PushSubscribe />
        </span>
        <span className='hidden sm:flex'>
          <PushSubscribe />
        </span>

        <GitHubButton />

        <Link
          href='/rss'
          className='inline-flex items-center rounded-lg px-3 py-2 text-sm text-black shadow transition duration-200 hover:text-gray-700'
          target='_blank'
          aria-label='Subscribe to RSS feed (opens in a new tab)'
        >
          <RssSimple size={20} />
        </Link>
      </div>
    </nav>
  );
}
