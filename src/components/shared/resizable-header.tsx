'use client';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu
} from '@/components/ui/resizable-navbar';
import { useState } from 'react';
import GitHubButton from '../github-button';
import { RssSimple } from '@phosphor-icons/react';
import Link from 'next/link';

export function ResizableNavbar() {
  const navItems = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'Communities',
      link: '/Communities'
    },
    {
      name: 'Archive',
      link: '/archive'
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='relative w-full'>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className='flex items-center gap-4'>
            <GitHubButton />
            <NavbarButton variant='secondary' href='/rss' className='inline-flex items-center'>
              <RssSimple size={20} className='mr-1' />
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className='relative py-2 text-black transition-colors duration-200 hover:text-gray-700'
              >
                <span className='block text-lg font-medium'>{item.name}</span>
              </Link>
            ))}
            <div className='flex w-full flex-col gap-4 border-t border-gray-200 pt-4'>
              <div className='flex w-full flex-row gap-2'>
                <GitHubButton />
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant='secondary'
                  href='/rss'
                  className='inline-flex items-center px-3 py-2'
                >
                  <RssSimple size={20} className='mr-1' />
                  RSS
                </NavbarButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
