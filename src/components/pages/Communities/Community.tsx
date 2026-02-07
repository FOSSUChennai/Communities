'use client';
import React, { useState } from 'react';
import communities from '../../../data/communities.json';
import Image from 'next/image';
import {
  DiscordLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  MastodonLogo,
  TelegramLogo,
  XLogo,
  YoutubeLogo,
  Butterfly,
  XSquare,
  RedditLogo
} from '@phosphor-icons/react';
import HoverIcon from './HoverIcon';

type CommunityCardProps = {
  name: string;
  description: string;
  logo?: string;
  twitter?: string;
  linkedin?: string;
  discord?: string;
  website?: string;
  instagram?: string;
  bluesky?: string;
  mastodon?: string;
  telegram?: string;
  location?: string;
  youtube?: string;
  github?: string;
  reddit?: string;
  className?: string;
};

const CommunityCard = ({
  name,
  description,
  logo,
  twitter,
  linkedin,
  discord,
  website,
  location,
  instagram,
  bluesky,
  mastodon,
  telegram,
  youtube,
  github,
  reddit,
  className
}: CommunityCardProps) => {
  const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const socialLinks = {
    linkedin: { Icon: LinkedinLogo, color: 'text-blue-700', title: 'LinkedIn', link: linkedin },
    github: { Icon: GithubLogo, color: 'text-black', title: 'GitHub', link: github },
    discord: { Icon: DiscordLogo, color: 'text-indigo-500', title: 'Discord', link: discord },
    twitter: { Icon: XLogo, color: 'text-black', title: 'Twitter', link: twitter },
    instagram: { Icon: InstagramLogo, color: 'text-pink-500', title: 'Instagram', link: instagram },
    bluesky: { Icon: Butterfly, color: 'text-blue-400', title: 'Bluesky', link: bluesky },
    mastodon: { Icon: MastodonLogo, color: 'text-purple-600', title: 'Mastodon', link: mastodon },
    telegram: { Icon: TelegramLogo, color: 'text-blue-400', title: 'Telegram', link: telegram },
    youtube: { Icon: YoutubeLogo, color: 'text-red-600', title: 'Youtube', link: youtube },
    reddit: { Icon: RedditLogo, color: 'text-red-600', title: 'Reddit', link: reddit }
  };

  return (
    <article
      className={`${className} group relative block rounded-lg p-[2px] transition-all duration-300 hover:scale-[1]`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        style={{
          background: mousePosition
            ? `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(74, 222, 128), transparent 70%)`
            : 'none',
          maskImage: 'linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor'
        }}
      />
      <div className='relative h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'>
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-50'
          style={{
            background: mousePosition
              ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
              : 'none'
          }}
        />

        <div className='flex h-full flex-col'>
          <a
            href={website}
            target='_blank'
            rel='noopener noreferrer'
            className='mb-4 flex flex-shrink-0 items-center gap-4'
          >
            {logo && (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={0}
                height={0}
                sizes='60vw'
                className='h-auto max-h-[80px] w-auto max-w-[80px] flex-shrink-0 rounded-sm object-cover transition-all duration-300 hover:filter-none'
              />
            )}
            <div>
              <h3
                className='line-clamp-2 break-words text-xl font-semibold text-gray-900'
                title={name}
              >
                {name}
              </h3>
              <span className={`rounded bg-green-100 px-2 py-0.5 text-xs text-green-800`}>
                {location}
              </span>
            </div>
          </a>

          <p className='line-clamp-5 flex-1 text-justify text-gray-600'>{description}</p>

          {/* This creates a line only if social links exist*/}
          {(twitter ||
            linkedin ||
            github ||
            discord ||
            instagram ||
            bluesky ||
            mastodon ||
            telegram ||
            youtube) && <div className='mt-4 flex-shrink-0 border-t border-gray-100' />}

          <div className='mt-4 flex flex-shrink-0 gap-3 opacity-100 transition-opacity'>
            {Object.entries(socialLinks).map(([key, { Icon, color, title, link }]) => {
              const socialProps = {
                linkedin,
                github,
                discord,
                twitter,
                instagram,
                bluesky,
                mastodon,
                telegram,
                youtube,
                reddit
              } as Record<string, string | undefined>;
              return socialProps[key] ? (
                <HoverIcon
                  key={key}
                  Icon={Icon}
                  link={link ?? ''}
                  title={title}
                  hoverColor={color}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className='container-page py-12'>
      <section className='surface relative w-full p-5 sm:p-8'>
        <div className='mb-8'>
          <h1 className='section-title'>Tech Communities in Tamil Nadu</h1>
          <p className='mt-2 text-sm text-gray-600'>Find your people. Join, learn, and share.</p>
          <div className='relative'>
            <MagnifyingGlass className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search communities by name or location...'
              className='mt-4 w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
              aria-label='Search communities'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
          {filteredCommunities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((community, index) => (
              <div key={index} className='group relative h-full'>
                <CommunityCard className='h-full' {...community} />
              </div>
            ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className='flex h-full flex-col items-center justify-center'>
            <XSquare size={100} className='mb-4 text-gray-400' weight='light' />
            <p className='mt-6 text-center text-lg text-gray-500'>
              No communities found matching your search.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Community;
