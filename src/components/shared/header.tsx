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
    <nav className='flex w-full items-center justify-between bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        {/* Show Logo on desktop, Icon on mobile */}
        <span className='hidden sm:inline'>
          <Image
            src={Logo}
            alt='Tamil Nadu Tech Logo'
            width={400}
            height={69}
            className='h:8 w-auto max-[375px]:h-6 sm:h-10 lg:h-12'
          />
        </span>
        <span className='inline sm:hidden'>
          <Image src={Icon} alt='Tamil Nadu Tech Icon' width={32} height={32} className='h-8 w-8' />
        </span>
      </Link>
      <div className='flex h-full items-center space-x-4'>
        {/* Always show PushSubscribe on mobile, only on desktop if sm+ */}
        <span className='flex sm:hidden'>
          <PushSubscribe />
        </span>
        <span className='hidden sm:flex'>
          <PushSubscribe />
        </span>
        <GitHubButton />
        <Link
          href='/rss'
          className='inline-flex items-center rounded-lg px-4 py-2 text-sm text-black shadow transition duration-200 hover:text-gray-700'
          target='_blank'
        >
          <RssSimple size={20} />
        </Link>
      </div>
    </nav>
  );
}
