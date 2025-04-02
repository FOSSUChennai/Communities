'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CallToAction = () => {
  const router = useRouter();
  return (

    <div className='p-4 md:p-8 lg:p-16'>
      <div className='relative rounded-xl bg-[#4CAF50] dark:bg-[#2a9531]'>
        <div className='flex items-center justify-between p-8'>
          <div className='max-w-2xl'>
            <h3 className='mb-6 text-center text-2xl font-normal text-white dark:text-gray-200 md:text-left md:text-3xl'>
              Know a tech event? <br /> Share it to help others find and join by adding yours to the
              list!
            </h3>
            <div className='flex flex-wrap justify-center gap-4 md:justify-start'>
              <button
                className='rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300'
                onClick={() =>
                  window.open(
                    'https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md'
                  )
                }
              >
                Contribute
              </button>
              <button
                className='rounded-md border-2 border-white bg-transparent px-6 py-2 text-white transition-colors hover:bg-white/10 dark:border-2 dark:border-gray-700'
                onClick={() => window.open('https://fossunited.org/c/chennai')}
              >
                Visit Us
              </button>
            </div>

    <div className='m-[12px] px-6 py-12 md:px-16'>
      <div className='relative rounded-lg bg-[#4CAF50] p-10 shadow-lg'>
        <div className='absolute bottom-0 right-0 hidden translate-x-[72px] md:block'>
          <Image
            src='/rockethalf.png'
            alt='Rocket'
            width={300}
            height={300}
            className='scale-125'
            style={{ transformOrigin: 'bottom right' }}
          />
        </div>

        <div className='relative z-10 flex flex-col text-left'>
          <div className='max-w-2xl'>
            <h3 className='text-3xl font-semibold text-white md:text-4xl'>
              Know a tech event? <br className='hidden md:block' /> Share it to help others find and
              join!
            </h3>
            <p className='mt-3 text-lg font-medium text-white/80 drop-shadow-md'>
              Add your event to our list and be a part of the growing tech community.
            </p>
          </div>

          <div className='mt-6 flex flex-wrap gap-4'>
            <button
              className='rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-900 focus:ring focus:ring-gray-400/40 active:scale-95'
              onClick={() =>
                window.open('https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md')
              }
            >
              Contribute
            </button>
            <button
              className='rounded-lg border border-white/50 bg-transparent px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 focus:ring focus:ring-white/30 active:scale-95'
              onClick={() => router.push('/Communities')}
            >
              Communities
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
