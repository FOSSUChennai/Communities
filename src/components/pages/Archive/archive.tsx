'use client';
import React, { useState } from 'react';
import EventCard from '../home/event-card';

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

const Archive = ({ initialEvents = [] }: { initialEvents?: Event[] }) => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedEvents = initialEvents
    .filter((event) => {
      if (selectedCommunity === 'all') return true;
      return event.communityName === selectedCommunity;
    })
    .sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const uniqueCommunities = Array.from(
    new Set(initialEvents.map((event) => event.communityName))
  ).sort();

  const pastEventsList = sortedEvents.filter((event) => {
    const eventDate = new Date(event.eventEndDate ?? event.eventDate);
    eventDate.setHours(23, 59, 59, 999);
    return eventDate <= today;
  });

  return (
    <main className='mx-4 rounded-xl bg-white p-6 md:mx-8 lg:mx-16'>
      <section>
        <h2 className='mb-3 text-lg font-normal'>
          <span className='text-[30px] font-semibold text-black'>archive</span>
        </h2>

        {/* Filter and Sort Controls */}
        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-4'>
            {/* Community Filter Dropdown */}
            <div className='flex items-center gap-2'>
              <label htmlFor='communityFilter' className='text-sm font-medium text-gray-700'>
                Filter by Community:
              </label>
              <select
                id='communityFilter'
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500'
              >
                <option value='all'>All Communities</option>
                {uniqueCommunities.map((community) => (
                  <option key={community} value={community}>
                    {community}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order Controls */}
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-gray-700'>Sort by Date:</span>
              <div className='flex overflow-hidden rounded-md border border-gray-300'>
                <button
                  onClick={() => setSortOrder('asc')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    sortOrder === 'asc'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`border-l border-gray-300 px-3 py-2 text-sm font-medium transition-colors ${
                    sortOrder === 'desc'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className='text-sm text-gray-600'>
            {pastEventsList.length} event{pastEventsList.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {pastEventsList.length > 0 ? (
            pastEventsList.map((event, index) => (
              <EventCard
                key={index}
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
            ))
          ) : (
            <div className='col-span-full mt-10 flex flex-col items-center justify-center text-gray-500'>
              No archived events found
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Archive;
