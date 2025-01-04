'use client';
import React from 'react';
import events from '../../../data/events.json';
import { MapPin } from 'phosphor-react';
import EmptyEventCard from '../../EmptyEventCard';
import Image from 'next/image';

type EventCardProps = {
  communityName: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  link: string;
  logo?: string;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Events = () => {
  const EventCard: React.FC<EventCardProps> = ({
    communityName,
    title,
    date,
    location,
    venue,
    link,
    logo
  }) => {
    const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    return (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='group relative block cursor-pointer rounded-lg p-[2px] transition-all duration-300'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background: mousePosition
              ? `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(74, 222, 128), transparent 70%)`
              : 'none',
            maskImage: 'linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor'
          }}
        />
        <div className='relative h-full overflow-hidden rounded-lg border-2 border-[rgb(229,231,235)] bg-white p-4 shadow-sm transition-shadow hover:border-[rgb(255,255,255,0.5)] hover:shadow-md'>
          <div
            className='pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-50'
            style={{
              background: mousePosition
                ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
                : 'none'
            }}
          />
          {logo && (
            <div className='absolute right-3 top-3'>
              <Image
                src={logo}
                alt={`${communityName} logo`}
                width={24}
                height={24}
                className='rounded-full object-cover grayscale filter transition-all duration-300 group-hover:filter-none'
              />
            </div>
          )}
          <div className='inline-block rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black'>
            {communityName}
          </div>

          <h3
            className='mb-2 mt-3 line-clamp-2 text-xl font-medium text-black transition-all duration-300 group-hover:line-clamp-none'
            title={title}
          >
            {title}
          </h3>

          <div className='flex-row items-center space-y-2 text-sm text-gray-600'>
            <div className='flex items-center space-x-2'>
              <span className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800'>
                {location}
              </span>
              <span className='rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800'>
                {formatDate(date)}
              </span>
            </div>

            <span className='mb-2 flex items-start pt-8 text-xs'>
              <MapPin size={16} />
              {venue}
            </span>
          </div>
        </div>
      </a>
    );
  };

  const monthlyEvents = events.filter((event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.eventDate);
    return eventDate.getMonth() === currentDate.getMonth();
  });

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    const currentDate = new Date();

    const eventYear = eventDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const eventMonth = eventDate.getMonth();
    const currentMonth = currentDate.getMonth();

    return (eventYear === currentYear && eventMonth > currentMonth) || eventYear > currentYear;
  });

  return (
    <main className='mx-4 rounded-xl bg-white p-4 md:mx-8 lg:mx-16'>
      <section>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>this month</span>
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {monthlyEvents.length > 0 ? (
            monthlyEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                location={event.location}
                title={event.eventName}
                date={event.eventDate}
                venue={event.eventVenue}
                link={event.eventLink}
                logo={event.communityLogo}
              />
            ))
          ) : (
            <EmptyEventCard message='No events scheduled for this month' />
          )}
        </div>
      </section>

      <section className='mt-12'>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>upcoming</span>
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                title={event.eventName}
                location={event.location}
                date={event.eventDate}
                venue={event.eventVenue}
                link={event.eventLink}
                logo={event.communityLogo}
              />
            ))
          ) : (
            <EmptyEventCard message='No upcoming events scheduled' />
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;
