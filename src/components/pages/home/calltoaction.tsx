'use client';
import React from 'react';

const CallToAction = () => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
