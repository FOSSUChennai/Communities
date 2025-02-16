'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RocketUpdated from '../../../../public/RocketUpdated.png';
import { useTheme } from 'next-themes';

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is applied after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid SSR mismatch

  return (
    <>
      <div
        className={`z-10 my-16 mb-48 flex items-start px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-[#fafafa] text-black'}`}
      >
        <div className='container mx-auto flex flex-col items-center justify-between px-4 text-center md:flex-row md:text-left'>
          <div className='z-10 max-w-2xl'>
            <h1 className='text-4xl font-semibold leading-tight md:text-[68px] lg:text-[74px]'>
              {`Don't miss your`} <br />
              next community
              <br />
              <span className='italic text-[#03b051]'>meetup</span>
            </h1>
            <p className='mt-4 text-[20px] text-gray-600'>meet. network. share</p>
          </div>
          <div className='z-10'>
            <Image src={RocketUpdated} alt='Rocket illustration' width={288} height={365} />
          </div>
        </div>
      </div>

      {/* Background Blur Effect */}
      <div
        className={`absolute inset-0 z-0 h-[350px] w-[350px] translate-x-[40px] translate-y-[120px] rounded-full bg-[#7eff5f]/75 blur-[140px] md:h-[406px] md:w-[406px] md:translate-x-[440px] md:translate-y-[120px] md:blur-[200px]`}
      />
    </>
  );
};

export default Hero;
