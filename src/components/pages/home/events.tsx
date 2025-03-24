'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import events from '../../../data/events.json';
import EmptyEventCard from '../../no-events-card';
import EventCard from '@/components/pages/home/event-card';

type Event = {
  communityName: string;
  communityLogo: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  eventLink: string;
  location: string;
};

const Events = () => {
  const [monthlyCardHeight, setMonthlyCardHeight] = useState<number>(0);
  const [upcomingCardHeight, setUpcomingCardHeight] = useState<number>(0);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const endOfToday = useMemo(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  }, []);

  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()),
    []
  );

  const { monthlyEvents, upcomingEvents } = useMemo(() => {
    const monthly = sortedEvents.filter((event) => {
      const eventDate = new Date(event.eventDate);
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate >= today
      );
    });

    const upcoming = sortedEvents.filter((event) => {
      const eventDate = new Date(event.eventDate);
      return (
        eventDate > endOfToday &&
        (eventDate.getMonth() !== today.getMonth() ||
          eventDate.getFullYear() !== today.getFullYear())
      );
    });

    return { monthlyEvents: monthly, upcomingEvents: upcoming };
  }, [sortedEvents, today, endOfToday]);

  const calculateMaxHeight = (events: Event[]) => {
    if (events.length === 0) return 100;
    const longestTitle = events.reduce(
      (max, event) => (event.eventName.length > max.length ? event.eventName : max),
      ''
    );
    const baseHeight = 24;
    const charsPerLine = 35;
    const lines = Math.ceil(longestTitle.length / charsPerLine);
    return Math.max(100, lines * baseHeight);
  };

  useEffect(() => {
    setMonthlyCardHeight(calculateMaxHeight(monthlyEvents));
    setUpcomingCardHeight(calculateMaxHeight(upcomingEvents));
  }, [monthlyEvents, upcomingEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const renderEventCards = (events: Event[], cardHeight: number) =>
    events.map((event, index) => (
      <motion.div
        key={`${event.eventName}-${event.eventDate}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <EventCard
          communityName={event.communityName}
          location={event.location}
          title={event.eventName}
          date={event.eventDate}
          venue={event.eventVenue}
          link={event.eventLink}
          logo={event.communityLogo}
          cardHeight={cardHeight}
        />
      </motion.div>
    ));

  return (
    <motion.main
      className='mx-4 rounded-xl bg-gradient-to-b from-transparent to-white p-6 md:mx-8 lg:mx-16'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.section variants={sectionVariants}>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>this month</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {monthlyEvents.length > 0 ? (
            renderEventCards(monthlyEvents, monthlyCardHeight)
          ) : (
            <motion.div
              className='col-span-1 sm:col-span-2 xl:col-span-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyEventCard message='No events scheduled for this month' />
            </motion.div>
          )}
        </div>
      </motion.section>

      <motion.section className='mt-12' variants={sectionVariants}>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>upcoming</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {upcomingEvents.length > 0 ? (
            renderEventCards(upcomingEvents, upcomingCardHeight)
          ) : (
            <motion.div
              className='col-span-1 sm:col-span-2 xl:col-span-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyEventCard message='No upcoming events scheduled' />
            </motion.div>
          )}
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Events;
