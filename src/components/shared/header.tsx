'use client';
import Link from 'next/link';
import Image from 'next/image';
import GitHubButton from '../github-button';
import Logo from '../../../public/logo.webp';
import { RssSimple } from '@phosphor-icons/react';

export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        <Image
          src={Logo}
          alt='Tamil Nadu Tech Logo'
          width={400}
          height={69} // XD
          className='h:8 w-auto max-[375px]:h-6 sm:h-10 lg:h-12'
        />
      </Link>
      <div className='flex h-full items-center space-x-4'>
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
