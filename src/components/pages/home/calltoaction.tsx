'use client';
import React from 'react';

const CallToAction = () => {
  return (
    <div className="px-6 py-12 md:px-16">
      <div className="relative overflow-hidden rounded-lg bg-[#4CAF50] p-10 shadow-lg">

        <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
    
          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold text-white md:text-4xl">
              Know a tech event? <br className="hidden md:block" /> Share it to help others find and join!
            </h3>
            <p className="mt-3 text-lg text-white/80">
              Add your event to our list and be a part of the growing tech community.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-0 md:justify-start">
            <button
              className="rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-900 focus:ring focus:ring-gray-400/40 active:scale-95"
              onClick={() =>
                window.open('https://github.com/FOSSUChennai/Communities/blob/main/CONTRIBUTING.md')
              }
            >
              Contribute
            </button>
            <button
              className="rounded-lg border border-white/50 bg-transparent px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 focus:ring focus:ring-white/30 active:scale-95"
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



