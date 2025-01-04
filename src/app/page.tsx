import CallToAction from '../components/pages/home/calltoaction';
import Hero from '../components/pages/home/hero';
import Events from '../components/pages/home/events';

export default function Home() {
  return (
    <>
      <div className='mx-auto font-inter'>
        <Hero />
        <Events />
        <CallToAction />
      </div>
    </>
  );
}
