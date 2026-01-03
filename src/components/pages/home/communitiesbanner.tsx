'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

const CommunitiesBanner = () => {
  const router = useRouter();
  return (
    <div className='m-[12px] px-6 py-7 md:px-16'>
      <div
        className='shodow-lg cursor-pointer rounded-lg bg-[#4CAF50] p-2 text-center'
        onClick={() => router.push('/Communities')}
      >
        <div className='max-w-6xl'>
          <h3 className='text-xl font-semibold text-white md:text-2xl'>
            Technology is best when it brings people together.
            <br className='block' />{' '}
            <span className='text-xl text-black md:text-2xl'>Join the Developer Community!</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesBanner;
