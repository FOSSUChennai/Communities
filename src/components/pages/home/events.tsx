'use client';

import events from '../../../data/events.json';
import { MapPin } from 'phosphor-react';
import EmptyEventCard from '../../no-events-card';
import Image from 'next/image';

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
  isMonthly: boolean;
};

// Function to format time to IST (GMT+5:30)
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setUTCHours(hours, minutes, 0, 0); // Convert to GMT

  // Convert to IST (GMT+5:30)
  date.setMinutes(date.getMinutes() + 330);

  const formattedHours = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm} IST`;
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
  return (
    <div className='rounded-lg border bg-gray-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg'>
      <div className='mb-2 flex items-center'>
        {logo && (
          <Image src={logo} alt={communityName} width={40} height={40} className='rounded-full' />
        )}
        <div className='ml-3'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='text-sm text-gray-600'>{communityName}</p>
        </div>
      </div>
      <p className='ml-1 ml-2 text-sm text-gray-600'>{date}</p>

      {/* Timings UI (Only this is changed) */}
      <div className='mt-2 flex items-center gap-2'>
        <div className='rounded-full border border-green-600 bg-white px-3 py-1 text-xs font-semibold text-green-600'>
          {formatTime(startTime)} - {formatTime(endTime)}
        </div>
      </div>

      <p className='text-sm text-gray-600'>{venue}</p>
      <p className='flex items-center text-sm text-gray-600'>
        <MapPin className='mr-1' /> {location}
      </p>

      <a href={link} className='mt-3 inline-block text-blue-500 hover:underline'>
        View Event
      </a>
    </div>
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
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
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
          <span className='text-[30px] font-semibold text-black'>Upcoming</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
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
