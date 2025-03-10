'use client';
import React, { useState } from 'react';
import communities from '../../../data/communities.json';
import Image from 'next/image';
import { MagnifyingGlass, X } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faLinkedin,
  faDiscord,
  faInstagram,
  faBluesky,
  faMastodon,
  faTelegram,
  faYoutube,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

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

  return (
    <div
      className='group relative block cursor-pointer rounded-lg p-[2px] transition-all duration-300 hover:scale-[1]'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => website && window.open(website, '_blank')}
    >
      <div
        className='pointer-events-none relative inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100'
        style={{
          background: mousePosition
            ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
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
          <div className='mb-4 flex items-center gap-4'>
            {logo && (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={60}
                height={60}
                className='rounded-sm object-cover filter transition-all duration-300 hover:filter-none' 
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
          </div>

          <p className='line-clamp-5 text-gray-600 text-justify'>{description}</p>

          <div className='mt-4 flex gap-3 border-t border-gray-100 pt-4 opacity-100 transition-opacity'>
            {linkedin && (
              <a
                href={linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-blue-700'
                title='LinkedIn'
              >
                <FontAwesomeIcon icon={faLinkedin} size='lg' />
              </a>
            )}
             {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-black'
                title='GitHub'
              >
                <FontAwesomeIcon icon={faGithub} size='lg' />
              </a>
            )}
            {discord && (
              <a
                href={discord}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-indigo-500'
                title='Discord'
              >
                <FontAwesomeIcon icon={faDiscord} size='lg' />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-black'
                title='Twitter'
              >
                <FontAwesomeIcon icon={faXTwitter} size='lg' />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-pink-600'
                title='Instagram'
              >
                <FontAwesomeIcon icon={faInstagram} size='lg' />
              </a>
            )}
            {bluesky && (
              <a
                href={bluesky}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-blue-400'
                title='Bluesky'
              >
                <FontAwesomeIcon icon={faBluesky} size='lg' />
              </a>
            )}
            {mastodon && (
              <a
                href={mastodon}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-purple-600'
                title='Mastodon'
              >
                <FontAwesomeIcon icon={faMastodon} size='lg' />
              </a>
            )}
            {telegram && (
              <a
                href={telegram}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-blue-400'
                title='Telegram'
              >
                <FontAwesomeIcon icon={faTelegram} size='lg' />
              </a>
            )}
            {youtube && (
              <a
                href={youtube}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 transition-colors hover:text-red-600'
                title='Youtube'
              >
                <FontAwesomeIcon icon={faYoutube} size='lg' />
              </a>
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
          {filteredCommunities.sort((a, b) => a.name.localeCompare(b.name)).map((community, index) => (
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
            <X size={50} color='gray' weight='bold' />
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
