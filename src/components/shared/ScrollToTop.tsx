'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'phosphor-react';

const ScrollToTop: React.FC = () => {
  const [showScroll, setShowScroll] = useState<boolean>(false);

  const scrollTop = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 560) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    console.log('AFASDSD');
    window.addEventListener('scroll', scrollTop);

    return () => {
      window.removeEventListener('scroll', scrollTop);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a
      href='#top'
      onClick={handleClick}
      className={`scroll-top ${showScroll ? 'show-scroll' : 'hidden'} fixed bottom-7 right-6 rounded-full bg-[#4CAF50] p-3 text-white transition-all`}
    >
      <ArrowUp size={20} />
    </a>
  );
};

export default ScrollToTop;
