'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import eventsJson from '../../../data/events.json';
import EmptyEventCard from '../../no-events-card';
import EventCard from './event-card';

type Event = {
  communityName: string;
  communityLogo: string;
  eventName: string;
  eventDate: string;
  eventEndDate?: string;
  eventVenue: string;
  eventTime: string;
  eventEndTime?: string;
  eventLink: string;
  location: string;
  alert?: {
    message: string;
    type?: 'postponed' | 'venue-change' | 'cancelled' | 'general';
  };
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      fetch(
        'https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/events.json'
      )
        .then((response) => {
          if (!response.ok) {
            setEvents(eventsJson as Event[]);
            return null;
          }
          return response.json();
        })
        .then((json) => {
          if (json) {
            setEvents(json);
          }
        })
        .catch(() => {
          setEvents(eventsJson as Event[]);
        });
    } else {
      setEvents(eventsJson as Event[]);
    }
  }, []);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );

  const monthlyEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.eventDate);
    const eventEndDate = new Date(event.eventEndDate ?? event.eventDate);
    eventEndDate.setHours(23, 59, 59, 999);

    return (
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear() &&
      eventEndDate >= today
    );
  });

  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return (
      eventDate > endOfToday &&
      (eventDate.getMonth() !== today.getMonth() || eventDate.getFullYear() !== today.getFullYear())
    );
  });

  const renderEventCards = (eventList: Event[]) =>
    eventList.map((event, index) => (
      <motion.div
        key={event.eventLink || `${event.eventDate}-${event.eventName}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <EventCard
          communityName={event.communityName}
          location={event.location}
          title={event.eventName}
          date={event.eventDate}
          endDate={event.eventEndDate}
          venue={event.eventVenue}
          link={event.eventLink}
          time={event.eventTime}
          endTime={event.eventEndTime}
          logo={event.communityLogo}
          alert={event.alert}
        />
      </motion.div>
    ));

  return (
    <motion.main
      className='mx-4 rounded-xl bg-gradient-to-b from-transparent to-white p-6 md:mx-8 lg:mx-16'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>this month</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {monthlyEvents.length > 0 ? (
            renderEventCards(monthlyEvents)
          ) : (
            <div className='col-span-1 sm:col-span-2 xl:col-span-3'>
              <EmptyEventCard message='No events scheduled for this month' />
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        className='mt-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>upcoming</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {upcomingEvents.length > 0 ? (
            renderEventCards(upcomingEvents)
          ) : (
            <div className='col-span-1 sm:col-span-2 xl:col-span-3'>
              <EmptyEventCard message='No upcoming events scheduled' />
            </div>
          )}
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Events;
