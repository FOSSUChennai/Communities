'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import RocketUpdated from '../../../../public/RocketUpdated.png';

const Hero = () => {
  return (
    <div className="relative z-10 my-16 mb-48 flex items-start bg-[#fafafa] px-4 md:px-8 lg:px-16">
      
      <div className="container relative mx-auto flex flex-col items-center justify-between px-4 text-center md:flex-row md:text-left">
        <motion.div
          className="z-10 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-semibold leading-tight text-black md:text-[68px] lg:text-[74px] relative">
            {`Don't `}
            <motion.span
              className="relative z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              miss
            </motion.span>
            {` your`} <br />
            next community
            <br />
            <motion.span
              className="italic text-[#03b051]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              meetup
            </motion.span>
          </h1>
          <motion.p
            className="mt-4 text-[20px] text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          >
            meet. network. share
          </motion.p>
        </motion.div>
        <motion.div
          className="z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image src={RocketUpdated} alt="Rocket illustration" width={288} height={365} />
        </motion.div>
      </div>
      <motion.div
        className="absolute z-0 h-[350px] w-[350px] left-[15%] top-[10%] rounded-full bg-[#7eff5f]/75 blur-[140px] 
                   md:h-[406px] md:w-[406px] md:left-[18%] md:top-[7%] md:blur-[200px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

export default Hero;


