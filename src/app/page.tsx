import Script from 'next/script'; 
import CallToAction from './calltoaction';
import Hero from './hero';
import NavBar from './nav';
import Events from './events';

export default function Home() {
  return (
    <>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="ff99f01a-248c-4f31-87f7-fc40499f219a"
        strategy="afterInteractive"
        async
        defer
      />
      <div className="bg-[#fafafa]">
        <div className="max-w-[1120px] mx-auto font-inter">
          <NavBar />
          <Hero />
          <Events />
          <CallToAction />
        </div>
      </div>
    </>
  );
}
