'use client';
import React, { useEffect, useRef, useState } from 'react';
import pastEvents from '../../../data/pastevents.json';
import { MapPin } from '@phosphor-icons/react';
import EmptyEventCard from '../../no-events-card';
import Image from 'next/image';
import AddToCalendar from '@/components/AddToCalendar';

type Event = {
  communityName: string;
  communityLogo: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  eventTime: string;
  eventLink: string;
  location: string;
};

type EventCardProps = {
  communityName: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  time: string;
  link: string;
  logo?: string;
  isMonthly: boolean;
  monthlyCardHeight: number;
  upcomingCardHeight: number;
};

const Archive = () => {
  const [monthlyCardHeight, setMonthlyCardHeight] = useState(0);
  const [upcomingCardHeight, setUpcomingCardHeight] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      fetch(
        'https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/pastevents.json'
      )
        .then((response) => {
          if (!response.ok) {
            setEvents(pastEvents);
            return null;
          }
          return response.json();
        })
        .then((json) => json && setEvents(json));
    } else {
      setEvents(pastEvents);
    }
  }, []);

  const sortedEvents = events
    .filter((event) => selectedCommunity === 'all' || event.communityName === selectedCommunity)
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        : new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );

  const uniqueCommunities = Array.from(new Set(events.map((e) => e.communityName))).sort();

  const monthlyEvents = sortedEvents.filter((e) => new Date(e.eventDate) <= today);
  const upcomingEvents = sortedEvents.filter((e) => new Date(e.eventDate) > endOfToday);

  const calculateMaxHeight = (events: Event[]) => {
    if (!events.length) return 100;
    const longest = events.reduce((a, b) => (a.eventName.length > b.eventName.length ? a : b));
    const baseHeight = 24;
    const charsPerLine = 35;
    const lines = Math.ceil(longest.eventName.length / charsPerLine);
    return Math.max(100, lines * baseHeight);
  };

  useEffect(() => {
    setMonthlyCardHeight(calculateMaxHeight(monthlyEvents));
    setUpcomingCardHeight(calculateMaxHeight(upcomingEvents));
  }, [monthlyEvents, upcomingEvents]);

  return (
    <main className='mx-4 rounded-xl bg-white p-6 dark:bg-[#1a1a1a] md:mx-8 lg:mx-16'>
      <section>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-gray-900 dark:text-white'>archive</span>
        </h2>

        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-2'>
              <label
                htmlFor='communityFilter'
                className='text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Filter by Community:
              </label>
              <select
                id='communityFilter'
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-[#222] dark:text-white'
              >
                <option value='all'>All Communities</option>
                {uniqueCommunities.map((community) => (
                  <option key={community} value={community}>
                    {community}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Sort by Date:
              </span>
              <div className='flex overflow-hidden rounded-md border border-gray-300 dark:border-gray-600'>
                <button
                  onClick={() => setSortOrder('asc')}
                  className={`px-3 py-2 text-sm font-medium ${
                    sortOrder === 'asc'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#2a2a2a]'
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`border-l border-gray-300 px-3 py-2 text-sm font-medium dark:border-gray-600 ${
                    sortOrder === 'desc'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#2a2a2a]'
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>
          </div>

          <div className='text-sm text-gray-600 dark:text-gray-300'>
            {monthlyEvents.length} event{monthlyEvents.length !== 1 && 's'} found
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {monthlyEvents.length ? (
            monthlyEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                title={event.eventName}
                date={event.eventDate}
                location={event.location}
                venue={event.eventVenue}
                time={event.eventTime}
                link={event.eventLink}
                logo={event.communityLogo}
                isMonthly={true}
                monthlyCardHeight={monthlyCardHeight}
                upcomingCardHeight={upcomingCardHeight}
              />
            ))
          ) : (
            <EmptyEventCard message='No events scheduled for this month' />
          )}
        </div>
      </section>
    </main>
  );
};

export default Archive;

const EventCard: React.FC<EventCardProps> = ({
  communityName,
  title,
  date,
  location,
  venue,
  time,
  link,
  logo,
  isMonthly,
  monthlyCardHeight,
  upcomingCardHeight
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setMousePosition(null);

  const validateAndFormatVenue = (venue: string) =>
    venue
      .trim()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

  return (
    <div
      className='group relative block cursor-pointer rounded-lg p-[2px]'
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
      <div className='relative h-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:border-white/50 hover:shadow-md dark:border-gray-700 dark:bg-[#121212]'>
        <div className='flex items-center justify-between gap-2'>
          <div className='rounded-md border border-black bg-white px-2 py-1 text-xs text-black dark:border-white dark:bg-transparent dark:text-white'>
            <span ref={communityNameRef} className='block max-w-[200px] truncate'>
              {communityName}
            </span>
          </div>
          {logo && (
            <Image
              src={logo}
              alt={`${title} logo`}
              width={24}
              height={24}
              className='rounded-sm object-cover'
            />
          )}
        </div>

        <a href={link} target='_blank' rel='noopener noreferrer' className='block'>
          <h3
            className='mb-2 mt-3 text-xl font-medium text-gray-900 dark:text-white'
            style={{
              height: `${isMonthly ? monthlyCardHeight : upcomingCardHeight}px`,
              overflow: 'hidden'
            }}
            title={title}
          >
            {title}
          </h3>

          <div className='text-sm text-gray-600 dark:text-gray-300'>
            <div className='flex items-center space-x-2'>
              <span className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-200'>
                {location}
              </span>
              <span className='rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                {date}
              </span>
              <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'>
                {time}
              </span>
              <AddToCalendar
                eventTitle={title}
                eventVenue={venue}
                eventDate={date}
                eventLink={link}
              />
            </div>
            <div className='mt-4 flex items-start gap-1 text-xs'>
              <MapPin size={16} className='min-w-[16px]' />
              <span>{validateAndFormatVenue(venue)}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

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
        <div className='absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform whitespace-nowrap rounded-md border border-gray-800 bg-gray-100 px-2 py-1 text-xs text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-100'>
          {content}
          <div className='absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-100 dark:bg-gray-800' />
        </div>
      )}
    </div>
  );
}
