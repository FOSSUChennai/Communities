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
    <nav className='w-full border-b border-gray-200 bg-background'>
      <div className='container-page flex items-center justify-between py-4'>
        <Link href='/' className='flex h-full items-center'>
          {/* Show Logo on desktop, Icon on mobile */}
          <span className='hidden sm:inline'>
            <Image
              src={Logo}
              alt='Tamil Nadu Tech Logo'
              width={400}
              height={69}
              className='h:8 w-auto max-[375px]:h-6 sm:h-10 lg:h-12'
              priority
            />
          </span>
          <span className='inline sm:hidden'>
            <Image
              src={Icon}
              alt='Tamil Nadu Tech Icon'
              width={32}
              height={32}
              className='h-8 w-8'
              priority
            />
          </span>
        </Link>

        <div className='flex h-full items-center gap-2 sm:gap-3'>
          <span className='flex'>
            <PushSubscribe />
          </span>
          <GitHubButton />
          <Link
            href='/rss'
            className='btn btn-ghost'
            target='_blank'
            aria-label='Subscribe to RSS feed (opens in a new tab)'
            title='RSS feed'
          >
            <RssSimple size={20} />
            <span className='hidden sm:inline'>RSS</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
