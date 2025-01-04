'use client';
import React, { useEffect, useRef, useState } from 'react';
import events from '../../../data/events.json';
import { MapPin } from 'phosphor-react';
import EmptyEventCard from '../../no-events-card';
import Image from 'next/image';
import AddToCalendar from '@/components/AddToCalendar';

type Event = {
  communityName: string;
  communityLogo: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  eventLink: string;
  location: string;
};

type EventCardProps = {
  communityName: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  link: string;
  logo?: string;
  isMonthly: boolean;
};

const Events = () => {
  const [monthlyCardHeight, setMonthlyCardHeight] = useState<number>(0);
  const [upcomingCardHeight, setUpcomingCardHeight] = useState<number>(0);

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

  const calculateMaxHeight = (events: Event[]) => {
    if (events.length === 0) return 100;
    const longestTitle = events.reduce((max, event) => {
      return event.eventName.length > max.length ? event.eventName : max;
    }, '');
    const baseHeight = 24;
    const charsPerLine = 35;
    const lines = Math.ceil(longestTitle.length / charsPerLine);
    return Math.max(100, lines * baseHeight);
  };

  useEffect(() => {
    setMonthlyCardHeight(calculateMaxHeight(monthlyEvents));
    setUpcomingCardHeight(calculateMaxHeight(upcomingEvents));
  }, [monthlyEvents, upcomingEvents]);

  const EventCard: React.FC<EventCardProps> = ({
    communityName,
    title,
    date,
    location,
    venue,
    link,
    logo,
    isMonthly
  }) => {
    const [mousePosition, setMousePosition] = React.useState<{
      x: number;
      y: number;
    } | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const communityNameRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const checkOverflow = () => {
        if (communityNameRef.current) {
          setIsOverflowing(
            communityNameRef.current.scrollWidth > communityNameRef.current.clientWidth
          );
        }
      };

      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }, [communityName]);

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
        <div className='relative h-full rounded-lg border-2 border-[rgb(229,231,235)] bg-white p-4 shadow-sm transition-shadow hover:border-[rgb(255,255,255,0.5)] hover:shadow-md'>
          <div
            className='pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-50'
            style={{
              background: mousePosition
                ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
                : 'none'
            }}
          />
          <div className='relative flex items-center justify-between gap-2'>
            {isOverflowing ? (
              <Tooltip content={communityName}>
                <div className='rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black'>
                  <span ref={communityNameRef} className='block max-w-[200px] truncate'>
                    {communityName}
                  </span>
                </div>
              </Tooltip>
            ) : (
              <div className='rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black'>
                <span ref={communityNameRef} className='block max-w-[200px] truncate'>
                  {communityName}
                </span>
              </div>
            )}
            {logo && (
              <Image
                src={logo}
                alt={`${title} logo`}
                width={24}
                height={24}
                className='rounded-full object-cover grayscale filter transition-all duration-300 hover:filter-none'
              />
            )}
          </div>

          <h3
            className='mb-2 mt-3 text-xl font-medium text-black transition-all duration-300'
            style={{
              height: `${isMonthly ? monthlyCardHeight : upcomingCardHeight}px`,
              overflow: 'hidden'
            }}
            title={title}
          >
            {title}
          </h3>

          <div className='flex-row items-center text-sm text-gray-600'>
            <div className='flex items-center space-x-2'>
              <span className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800'>
                {location}
              </span>
              <span className='rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800'>{date}</span>
              <AddToCalendar
                eventTitle={title}
                eventVenue={venue}
                eventDate={date}
                eventLink={link}
              />
            </div>
            <div className='mt-auto flex flex-grow flex-col justify-end'>
              <span className='mt-4 flex items-start gap-1 text-xs'>
                <MapPin size={16} className='mt-0.5 min-w-[16px]' />{' '}
                <span className='break-words'>{venue}</span>{' '}
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  };

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
                isMonthly={true}
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
                isMonthly={false}
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

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className='relative inline-block'>
      <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {children}
      </div>
      {showTooltip && (
        <div className='absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform whitespace-nowrap rounded-md border-2 border-black bg-gray-100 px-2 py-1 text-xs text-gray-800 shadow-lg'>
          {content}
          <div className='absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-100' />
        </div>
      )}
    </div>
  );
}
