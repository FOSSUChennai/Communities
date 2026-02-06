import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className='col-span-full flex flex-col items-center justify-center'>
      <div className='flex h-28 w-28 animate-spin items-center justify-center rounded-full border-8 border-gray-300 border-t-[#22c55e]'></div>
    </div>
  );
};

export default LoadingAnimation;
