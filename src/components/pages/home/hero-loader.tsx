'use client';

import dynamic from 'next/dynamic';

// adding this file , coz the ssr won't work with the server component which is page.tsx. making the ssr false will the hydration in the intial load aprm we are loading the hero dynamically so total blocking time will come down
const Hero = dynamic(() => import('./hero'), {});

// This component's only job is to render the dynamic Hero
export default function HeroLoader() {
  return <Hero />;
}
