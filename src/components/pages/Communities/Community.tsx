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
  XSquare
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
  github
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
    instagram: { Icon: InstagramLogo, color: 'text-pink-600', title: 'Instagram', link: instagram },
    bluesky: { Icon: Butterfly, color: 'text-blue-400', title: 'Bluesky', link: bluesky },
    mastodon: { Icon: MastodonLogo, color: 'text-purple-600', title: 'Mastodon', link: mastodon },
    telegram: { Icon: TelegramLogo, color: 'text-blue-400', title: 'Telegram', link: telegram },
    youtube: { Icon: YoutubeLogo, color: 'text-red-600', title: 'Youtube', link: youtube }
  };

  return (
    <div
      className='group relative block cursor-pointer rounded-lg p-[2px] transition-all duration-300 hover:scale-[1]'
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
      <div className='relative h-full rounded-lg border-2 border-[rgb(229,231,235)] bg-white p-4 shadow-sm transition-shadow hover:border-[rgb(255,255,255,0.5)] hover:shadow-md'>
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
            className='mb-4 flex items-center gap-4'
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

          <p className='line-clamp-5 text-justify text-gray-600'>{description}</p>

          <div className='mt-4 flex gap-3 border-t border-gray-100 pt-4 opacity-100 transition-opacity'>
            {Object.entries(socialLinks).map(([key, { Icon, color, title, link }]) =>
              eval(key) ? (
                <HoverIcon
                  key={key}
                  Icon={Icon}
                  link={link ?? ''} // Provide a default value for link
                  title={title}
                  hoverColor={color}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
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
    <main className='mx-4 mt-8 rounded-xl bg-white p-6 md:mx-8 lg:mx-16'>
      <section className='relative flex flex-col py-2'>
        <div className='mb-8'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900'>Tech Communities in Tamil Nadu</h2>
          <div className='relative'>
            <MagnifyingGlass className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search communities by name or location...'
              className='w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
          {filteredCommunities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((community, index) => (
              <div key={index} className='group relative'>
                <CommunityCard
                  name={community.name}
                  description={community.description}
                  logo={community.logo}
                  twitter={community.twitter}
                  linkedin={community.linkedin}
                  discord={community.discord}
                  website={community.website}
                  location={community.location}
                  bluesky={community.bluesky}
                  instagram={community.instagram}
                  mastodon={community.mastodon}
                  telegram={community.telegram}
                  github={community.github}
                  youtube={community.youtube}
                />
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
