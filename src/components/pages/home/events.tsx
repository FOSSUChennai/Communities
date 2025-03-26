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
  eventStartTime: string;
  eventEndTime: string;
  eventVenue: string;
  eventLink: string;
  location: string;
};

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

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setUTCHours(hours, minutes, 0, 0); // Convert to GMT
  
  const formattedHours = date.getUTCHours() % 12 || 12;
  const ampm = date.getUTCHours() >= 12 ? 'PM' : 'AM';
  
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm} `;
};

const EventCard: React.FC<EventCardProps> = ({ communityName, title, date, startTime, endTime, location, venue, link, logo }) => {
  return (
    <div className='rounded-lg border p-4 shadow-md'>
      {logo && <Image src={logo} alt={communityName} width={50} height={50} className='mb-2' />}
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-sm text-gray-600'>{communityName}</p>
      <p className='text-sm text-gray-600'>{date} from {formatTime(startTime)} to {formatTime(endTime)}</p>
      <p className='text-sm text-gray-600'>{venue}</p>
      <p className='text-sm text-gray-600 flex items-center'><MapPin className='mr-1' />{location}</p>
      <a href={link} className='mt-2 text-blue-500 hover:underline'>View Event</a>
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