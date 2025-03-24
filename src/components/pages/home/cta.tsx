'use client';
import React from 'react';
import Image from 'next/image';

const CallToAction = () => {
  return (
    <div className='px-6 py-12 md:px-16'>
      <div className='relative rounded-lg bg-[#4CAF50] p-10 shadow-lg'>
        <div className='absolute bottom-0 right-0 hidden translate-x-1/4 md:block'>
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
          <div className='max-w-2xl space-y-4'>
            <h2 className='text-4xl font-bold tracking-tight text-white md:text-4xl'>
              Know a tech event?
            </h2>
            <h3 className='text-2xl font-semibold text-white/90 md:text-xl'>
              Share it to help others find and join!
            </h3>
            <p className='text-md leading-relaxed text-white/80'>
              Add your event to our list and be a part of the growing tech community.
            </p>
          </div>

          <div className='mt-8 flex flex-wrap gap-6'>
            <button
              className='text-md rounded-lg bg-black px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-900 focus:ring focus:ring-gray-400/40 active:scale-95'
              onClick={() =>
                window.open('https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md')
              }
            >
              Contribute
            </button>
            <button
              className='rounded-lg border-2 border-white/50 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 focus:ring focus:ring-white/30 active:scale-95'
              onClick={() => window.open('https://fossunited.org/c/chennai')}
            >
              Visit Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
