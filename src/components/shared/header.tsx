'use client';

import Link from 'next/link';
import Image from 'next/image';
import GitHubButton from '../github-button';
import PushSubscribe from '../PushSubscribe';
import Logo from '../../../public/logo.webp';
import Icon from '../../app/favicon.ico';
import { RssSimple } from '@phosphor-icons/react';
import ThemeToggle from '../ThemeToggle';
import { GithubLogo } from '@phosphor-icons/react';

export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between bg-white px-4 py-4 text-black transition-colors duration-300 dark:bg-black dark:text-white md:px-8 lg:px-16'>
      {/* Logo Section */}
      <Link href='/' className='flex items-center space-x-2'>
        {/* Full logo on larger screens */}
        <span className='hidden sm:inline'>
          <Image
            src={Logo}
            alt='Tamil Nadu Tech Logo'
            width={400}
            height={69}
            className='h-10 w-auto lg:h-12'
          />
        </span>

        {/* Icon for small screens */}
        <span className='inline sm:hidden'>
          <Image src={Icon} alt='Tamil Nadu Tech Icon' width={32} height={32} className='h-8 w-8' />
        </span>
      </Link>

      {/* Action Buttons */}
      <div className='flex items-center space-x-2 sm:space-x-4'>
        {/* Notifications Button */}
        <div className='rounded-lg bg-gray-100 text-sm text-gray-900'>
          <PushSubscribe />
        </div>

        {/* GitHub Button */}
        <GitHubButton />

        {/* RSS Feed Button */}
        <Link
          href='/rss'
          target='_blank'
          className='dark:text-white-300 dark:hover:bg-grey flex items-center justify-center rounded-md px-2 py-2 text-sm text-gray-700 transition hover:text-green-600 dark:bg-gray-800 dark:hover:text-green-400'
          title='RSS Feed'
        >
          <RssSimple size={20} />
        </Link>

        {/* Theme Toggle Icon Only */}
        <ThemeToggle iconOnly />
      </div>
    </nav>
  );
}
