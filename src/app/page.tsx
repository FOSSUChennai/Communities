import CallToAction from '../components/pages/home/calltoaction';
import Hero from '../components/pages/home/hero';
import Events from '../components/pages/home/events';
import ScrollToTop from '../components/shared/ScrollToTop';

export default function Home() {
  return (
    <>
      <div>
        <div className='mx-auto max-w-[1120px] font-inter'>
          <Hero />
          <Events />
          <CallToAction />
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
