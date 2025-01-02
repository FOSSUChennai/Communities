// import events from '../data/events.json';
import CallToAction from './calltoaction';
import Hero from './hero';
import NavBar from './nav';
import Events from './events';

export default function Home() {
return (
    <div className='bg-[#fafafa] dark:bg-dark-content'>
    <div className='max-w-[1120px] mx-auto font-inter'>
        <NavBar />
        <Hero />
        <Events />
        <CallToAction />
        </div>
    </div>
);
}
