'use client';
import CallToActionButton from '@/components/callToAction-button';
import React from 'react';

const CallToAction = () => {
  return (
    <div className='p-4 md:p-8 lg:p-16'>
      <div className='relative rounded-xl bg-[#4CAF50]'>
        <div className='flex items-center justify-between p-10'>
          <div className='flex w-full flex-wrap items-center justify-center md:flex-nowrap md:gap-14'>
            <h3 className='mb-6 max-w-lg text-center text-2xl font-normal text-white md:mb-0 md:text-left lg:text-3xl'>
              Know a tech event? <br />
              <span className='text-lg leading-none lg:text-2xl'>
                Share it to help others find and join by adding yours to the list!
              </span>
            </h3>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <CallToActionButton
                label='Contribute'
                variant='primary'
                url='https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md'
              />
              <CallToActionButton
                label='Visit Us'
                variant='secondary'
                url='https://fossunited.org/c/chennai'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
