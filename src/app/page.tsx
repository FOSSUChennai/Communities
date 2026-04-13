import CallToAction from '../components/pages/home/calltoaction';
import Hero from '../components/pages/home/hero';
import Events from '../components/pages/home/events';

export default function Home() {
  return (
    <>
      <div>
        <div className='mx-auto max-w-[1120px] font-inter'>
          <section className='px-4 pt-8 md:px-8 lg:px-16'>
            <h1 className='text-4xl font-semibold leading-tight text-black md:text-5xl'>
              Tech Communities in Tamil Nadu
            </h1>
            <p className='mt-4 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg'>
              Discover active developer communities, meetups, and events happening across Tamil
              Nadu. From Chennai to Coimbatore, find local groups, learn from peers, and stay
              connected with the growing open-source and technology ecosystem.
            </p>
          </section>
          <Hero />
          <Events />
          <CallToAction />
        </div>
      </div>
    </>
  );
}
