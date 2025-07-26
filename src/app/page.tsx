import dynamic from 'next/dynamic';
import CallToAction from '../components/pages/home/calltoaction';
import Events from '../components/pages/home/events';
import ThemeToggle from '@/components/ThemeToggle';

const Hero = dynamic(() => import('../components/pages/home/hero'), {});

export default function Home() {
  return (
    <>
      <div>
        <div className='mx-auto max-w-[1120px] font-inter'>
          <Hero />
          <Events />
          <CallToAction />
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </>
  );
}
