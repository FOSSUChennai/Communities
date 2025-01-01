"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const tamilLetters = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];

const TechBackgroundAnimation = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!isClient) return null;

  const allItems = tamilLetters.map(letter => ({
    type: 'tamil',
    content: letter,
    x: Math.random() * dimensions.width,
    y: Math.random() * dimensions.height,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {allItems.map((item, index) => (
        <motion.div
          key={`item-${index}`}
          className="absolute text-4xl tamil-text text-gray-500 opacity-20"
          initial={{
            x: item.x,
            y: item.y,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [item.x, item.x + 100, item.x - 100, item.x],
            y: [item.y, item.y - 100, item.y + 100, item.y],
            scale: [0, 1, 1, 0],
            opacity: [0, 0.2, 0.2, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
};

export default TechBackgroundAnimation;