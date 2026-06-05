'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GitHubButton from '../github-button';
import PushSubscribe from '../PushSubscribe';
import Logo from '../../../public/logo.webp';
import Icon from '../../app/favicon.ico';
import { RssSimple } from '@phosphor-icons/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-transparent py-3' : 'bg-[#fafafa] py-4'
      }`}
    >
      <nav
        className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'mx-auto w-[calc(100%-1.5rem)] rounded-full border border-white/30 bg-white/70 px-6 py-3 text-black shadow-md backdrop-blur-md md:w-[calc(100%-3rem)] lg:w-[calc(100%-6rem)]'
            : 'w-full bg-transparent px-4 text-black md:px-8 lg:px-16'
        }`}
      >
        <Link href='/' className='flex h-full items-center text-xl font-semibold'>
          {/* Show Logo on desktop, Icon on mobile */}
          <span className='hidden sm:inline'>
            <Image
              src={Logo}
              alt='Tamil Nadu Tech Logo'
              width={400}
              height={69}
              className='h-8 w-auto max-[375px]:h-6 sm:h-10 lg:h-12'
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
        <div className='flex h-full items-center space-x-4'>
          {/* Always show PushSubscribe on mobile, only on desktop if sm+ */}
          <span className='flex sm:hidden'>
            <PushSubscribe isScrolled={isScrolled} />
          </span>
          <span className='hidden sm:flex'>
            <PushSubscribe isScrolled={isScrolled} />
          </span>
          <GitHubButton isScrolled={isScrolled} />
          <Link
            href='/rss'
            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm transition duration-200 ${
              isScrolled
                ? 'bg-black/5 text-black hover:bg-black/10'
                : 'bg-white text-black shadow hover:text-gray-700'
            }`}
            target='_blank'
          >
            <RssSimple size={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
