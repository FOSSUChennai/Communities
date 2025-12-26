'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CallToAction = () => {
  const router = useRouter();
  return (
    <section className='py-12'>
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-500 p-6 shadow-sm sm:p-8 md:overflow-visible md:p-10'>
        <div className='absolute bottom-0 right-0 hidden md:block md:translate-x-4 lg:translate-x-[72px]'>
          <Image
            src='/rockethalf.png'
            alt='Rocket'
            width={300}
            height={300}
            className='drop-shadow-md md:scale-100 lg:scale-125'
            style={{ transformOrigin: 'bottom right' }}
          />
        </div>

        <div className='relative z-10 flex flex-col text-left md:pr-48 lg:pr-64'>
          <div className='max-w-2xl'>
            <h3 className='text-3xl font-semibold text-white md:text-4xl'>
              Know a tech event? <br className='block' />{' '}
              <span className='text-gray-950'> Share it to help others find and join!</span>
            </h3>
            <p className='mt-3 text-lg font-medium text-white/90'>
              Add your event to our list and be a part of the growing tech community.
            </p>
          </div>

          <div className='mt-6 flex flex-wrap gap-4'>
            <button
              className='btn btn-primary px-6 py-3 text-base'
              onClick={() =>
                window.open('https://github.com/fossuchennai/communities/blob/main/CONTRIBUTING.md')
              }
            >
              Contribute
            </button>
            <button
              className='btn bg-white/15 px-6 py-3 text-base text-white hover:bg-white/20 focus-visible:ring-white/30'
              onClick={() => router.push('/Communities')}
            >
              Communities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
