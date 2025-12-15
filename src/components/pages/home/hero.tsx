'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import RocketUpdated from '../../../../public/rocket.webp';

const Hero = () => {
  return (
    <section className='relative z-10 py-14 sm:py-16'>
      <div className='relative flex flex-col items-center justify-between gap-10 text-center md:flex-row md:text-left'>
        <motion.div
          className='z-10 max-w-2xl'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className='section-kicker'>Discover meetups, workshops, and conferences.</p>
          <h1 className='relative mt-3 text-4xl font-semibold leading-tight tracking-tight text-gray-950 md:text-[64px] lg:text-[72px]'>
            {`Don't `}
            <motion.span
              className='relative z-20'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              miss
            </motion.span>
            {` your`} <br />
            next community
            <br />
            <motion.span
              className='italic text-green-600'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
              meetup
            </motion.span>
          </h1>
          <motion.p
            className='mt-4 text-lg font-medium text-gray-600 sm:text-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          >
            meet. network. share
          </motion.p>
        </motion.div>
        <motion.div
          className='z-10'
          initial={{ opacity: 0.1, x: 50 }} // ( why ) - this is for LCP making, 0 to 0.1 will treat the image as painted and won't go under repainting
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Image
            src={RocketUpdated}
            alt='Rocket illustration'
            width={600}
            height={760}
            sizes='(max-width: 768px) calc(100vw - 2rem), 50vw'
            className='h-[320px] w-auto sm:h-[365px]'
            priority
          />
        </motion.div>
      </div>
      <motion.div
        className='absolute left-[10%] top-[6%] z-0 h-[340px] w-[340px] rounded-full bg-green-300/60 blur-[140px] md:left-[14%] md:top-[5%] md:h-[406px] md:w-[406px] md:blur-[200px]'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </section>
  );
};

export default Hero;
