'use client';

import React, { useState } from 'react';
import communities from '../';

interface Community {
  name: string;
  logo: string;
  description: string;
  location: string;
  twitter?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
}

const Community: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCommunities = communities.filter(
    (community: Community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-white px-4 py-8 text-black dark:bg-black dark:text-white'>
      <h1 className='mb-6 text-center text-3xl font-bold'>Tech Communities in Tamil Nadu</h1>

      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search communities by name or location...'
          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-[#1c1c1c] dark:text-white'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {filteredCommunities.map((community: Community) => (
          <div
            key={community.name}
            className='rounded-lg border border-gray-200 bg-white p-4 shadow transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-[#121212]'
          >
            <div className='mb-2 flex items-center'>
              <img src={community.logo} alt={community.name} className='mr-3 h-10 w-10' />
              <div>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  {community.name}
                </h2>
                <span className='rounded bg-green-100 px-2 py-0.5 text-sm text-green-800 dark:bg-green-800 dark:text-green-100'>
                  {community.location}
                </span>
              </div>
            </div>
            <p className='mb-3 text-gray-700 dark:text-gray-300'>{community.description}</p>
            <div className='flex space-x-3'>
              {community.linkedin && (
                <a href={community.linkedin} target='_blank' rel='noopener noreferrer'>
                  <img src='/icons/linkedin.svg' alt='LinkedIn' className='h-5 w-5' />
                </a>
              )}
              {community.website && (
                <a href={community.website} target='_blank' rel='noopener noreferrer'>
                  <img src='/icons/website.svg' alt='Website' className='h-5 w-5' />
                </a>
              )}
              {community.instagram && (
                <a href={community.instagram} target='_blank' rel='noopener noreferrer'>
                  <img src='/icons/instagram.svg' alt='Instagram' className='h-5 w-5' />
                </a>
              )}
              {community.twitter && (
                <a href={community.twitter} target='_blank' rel='noopener noreferrer'>
                  <img src='/icons/twitter.svg' alt='Twitter' className='h-5 w-5' />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
