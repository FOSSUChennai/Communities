import dynamic from 'next/dynamic';
import CallToAction from '../components/pages/home/calltoaction';
import Events from '../components/pages/home/events';

const Hero = dynamic(() => import('../components/pages/home/hero'), {});

export default function Home() {
  return (
    <main className='container-page font-inter'>
      <Hero />
      <Events />
      <CallToAction />
    </main>
  );
}
