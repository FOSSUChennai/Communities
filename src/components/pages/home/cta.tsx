'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CallToAction = () => {
  const router = useRouter();
  return (
    <div className='mx-4 py-12 md:mx-8 lg:mx-16'>
      <div className='relative rounded-lg bg-[#4CAF50] p-10 shadow-lg md:w-[93%] lg:w-full'>
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

        <div className='relative z-10 flex flex-col text-left md:pr-[70px]'>
          <div className='max-w-2xl space-y-4'>
            <h2 className='text-4xl font-bold tracking-tight text-white md:text-4xl'>
              Know a tech event?
            </h2>
            <h3 className='text-2xl font-semibold text-black md:text-xl'>
              Share it to help others find and join!
            </h3>
            <p className='text-base leading-relaxed text-white/80'>
              Add your event to our list and be a part of the growing tech community.
            </p>
          </div>

          <div className='mt-8 flex flex-wrap gap-6'>
            <button
              className='rounded-lg bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-900 focus:ring focus:ring-gray-400/40 active:scale-95'
              onClick={() =>
                window.open(
                  'https://github.com/FOSSUChennai/Communities/blob/main/.github/CONTRIBUTING.md'
                )
              }
            >
              Contribute
            </button>
            <button
              className='rounded-lg border-2 border-white/50 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 focus:ring focus:ring-white/30 active:scale-95'
              onClick={() => router.push('/communities')}
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
