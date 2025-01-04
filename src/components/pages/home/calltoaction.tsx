'use client';
import React from 'react';

const CallToAction = () => {
  return (
    <div className='p-4 md:p-8 lg:p-16'>
      <div className='relative rounded-xl bg-[#4CAF50]'>
        <div className='flex items-center justify-between p-8'>
          <div className='max-w-2xl'>
            <h3 className='mb-6 text-center font-normal text-white md:text-left md:text-lg'>
              Know a tech event? Share it to help others find and join by adding yours to the list!
            </h3>
            <div className='flex flex-wrap justify-center gap-4 text-sm md:justify-start'>
              <button
                className='rounded-md bg-black px-3 py-1 text-white transition-colors hover:bg-gray-800 md:px-4 md:py-1.5'
                onClick={() =>
                  window.open(
                    'https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md'
                  )
                }
              >
                Contribute
              </button>
              <button
                className='rounded-md border-2 border-white bg-transparent px-3 py-1 text-white transition-colors hover:bg-white/10 md:px-4 md:py-1.5'
                onClick={() => window.open('https://fossunited.org/c/chennai')}
              >
                Visit Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
