'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GitHubButton from '../github-button';
import PushSubscribe from '../PushSubscribe';
import Logo from '../../../public/logo.webp';
import Icon from '../../app/favicon.ico';
import { RssSimple } from '@phosphor-icons/react';
import ThemeToggle from './theme-toggle';

export default function Header() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <nav
      className={`sticky top-3 z-50 mx-4 transition-all duration-700 ease-out md:mx-8 lg:mx-16 ${show ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'} `}
    >
      <div className='relative flex w-full items-center justify-between overflow-hidden rounded-full border border-black/5 bg-white/80 px-3 py-2 text-black backdrop-blur transition-shadow dark:border-white/10 dark:bg-zinc-900/80 dark:text-white'>
        {/* moving glow */}
        <span className='pointer-events-none absolute inset-0 z-0 opacity-70 [mask:linear-gradient(90deg,transparent,black,transparent)]'>
          <span className='absolute -inset-x-1 inset-y-0 bg-[linear-gradient(90deg,transparent,rgba(3,176,81,0.6),transparent)] blur-2xl [animation:glow-sweep_3.5s_linear_infinite] dark:bg-[linear-gradient(90deg,transparent,rgba(3,176,81,0.8),transparent)]' />
        </span>
        <Link href='/' className='flex h-full items-center text-xl font-semibold'>
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
            <Image
              src={Icon}
              alt='Tamil Nadu Tech Icon'
              width={32}
              height={32}
              className='h-8 w-8'
            />
          </span>
        </Link>
        <div className='flex h-full items-center space-x-1 sm:space-x-2'>
          <span className='flex sm:hidden'>
            <PushSubscribe />
          </span>
          <span className='hidden sm:flex'>
            <PushSubscribe />
          </span>
          <GitHubButton />
          <Link
            href='/rss'
            className='inline-flex items-center rounded-lg px-3 py-2 text-sm text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10'
            target='_blank'
          >
            <RssSimple size={20} />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
