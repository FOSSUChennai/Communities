'use client';

import { useState } from 'react';
import events from '../../../data/events.json';
import { MapPin } from 'phosphor-react';
import EmptyEventCard from '../../no-events-card';
import Image from 'next/image';
import AddToCalendar from '@/components/AddToCalendar';

type EventCardProps = {
  communityName: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  link: string;
  logo?: string;
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setUTCHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() + 330);
  const formattedHours = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const EventCard: React.FC<EventCardProps> = ({
  communityName,
  title,
  date,
  startTime,
  endTime,
  location,
  venue,
  link,
  logo
}) => {
  // Mouse tracking state for hover effect
  const [boxMousePosition, setBoxMousePosition] = useState<{ x: number; y: number } | null>(null);

  const handleBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBoxMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleBoxMouseLeave = () => {
    setBoxMousePosition(null);
  };

  return (
    <a href={link} target='_blank' rel='noopener noreferrer' className='block'>
      <div className='relative cursor-pointer overflow-hidden rounded-xl border-4 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg'>
        <div className='rounded-lg p-3 transition-colors duration-300 hover:bg-[#DFFFD8]'>
          {/* Community Name + Logo with Hover Effect */}
          <div className='mb-3 flex items-center justify-between'>
            <div
              className='relative overflow-hidden rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black transition-all duration-300'
              onMouseMove={handleBoxMouseMove}
              onMouseLeave={handleBoxMouseLeave}
              style={{
                background: boxMousePosition
                  ? `radial-gradient(100px circle at ${boxMousePosition.x}px ${boxMousePosition.y}px, rgba(74, 222, 128, 0.3), transparent 60%)`
                  : 'white'
              }}
            >
              <span className='block max-w-[200px] truncate'>{communityName}</span>
            </div>
            {logo && (
              <Image src={logo} alt={communityName} width={30} height={30} className='rounded' />
            )}
          </div>

          {/* Event Title */}
          <h3 className='mb-2 text-xl font-bold'>{title}</h3>

          {/* Time Slot */}
          <div className='mt-2 flex items-center gap-2'>
            <span className='rounded-md bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700'>
              {formatTime(startTime)} - {formatTime(endTime)} IST
            </span>
          </div>

          {/* Location + Date + Calendar Icon */}
          <div className='mt-2 flex items-center gap-2'>
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

          {/* Venue */}
          <p className='mt-2 flex items-center text-xs text-gray-600'>
            <MapPin size={14} className='mr-1 text-gray-500' /> {venue}
          </p>
        </div>
      </div>
    </a>
  );
};

const Events = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const sortedEvents = events.sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );

  const monthlyEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return (
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate >= today
    );
  });

  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return (
      eventDate > endOfToday &&
      (eventDate.getMonth() !== today.getMonth() || eventDate.getFullYear() !== today.getFullYear())
    );
  });

  return (
    <main className='mx-4 rounded-xl bg-white p-6 md:mx-8 lg:mx-16'>
      <section>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>This Month</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {monthlyEvents.length > 0 ? (
            monthlyEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                location={event.location}
                title={event.eventName}
                date={event.eventDate}
                startTime={event.eventStartTime}
                endTime={event.eventEndTime}
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
          <span className='text-[30px] font-semibold text-black'>Upcoming</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                title={event.eventName}
                location={event.location}
                date={event.eventDate}
                startTime={event.eventStartTime}
                endTime={event.eventEndTime}
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
