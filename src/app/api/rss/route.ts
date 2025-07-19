import RSS from 'rss';
import { NextResponse } from 'next/server';

import localEvents from '@/data/events.json';
import { SITE_URL } from '@/lib/constants';
import { convertToIST } from '@/lib/common';
import { Event } from '@/types/event';

/**
 * Generates the RSS feed for upcoming Tamil Nadu tech events.
 * @returns {NextResponse} - Returns the RSS XML response with event data.
 */
export async function GET() {
  const currentYear = new Date().getFullYear();
  const feed = createRSSFeed(currentYear);

  // Fetch events from GitHub or fall back to local events
  const events = await fetchEvents();
  const sortedEvents = getSortedEvents(events);

  if (sortedEvents.length) {
    sortedEvents.forEach((event) => addEventToFeed(feed, event));
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}

/**
 * Creates the RSS feed object with required metadata.
 * @param {number} year - The current year to use for copyright.
 * @returns {RSS} - The RSS feed instance.
 */
const createRSSFeed = (year: number): RSS => {
  return new RSS({
    title: 'தமிழ்நாடு டெக் | Tamilnadu Tech',
    description: 'Get All your Tamil Nadu Tech Meetups in one place',
    feed_url: `${SITE_URL}/api/rss`,
    site_url: SITE_URL,
    copyright: `© ${year} Tamilnadu Tech`,
    language: 'ta-IN | en-US',
    pubDate: convertToIST(new Date().toUTCString()),
    ttl: 60
  });
};

/**
 * Fetches events from GitHub or falls back to local events.
 * @returns {Promise<Event[]>} - Promise that resolves to events array.
 */
const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/events.json',
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      console.warn('Failed to fetch events from GitHub, using local events');
      return localEvents;
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events from GitHub:', error);
    return localEvents;
  }
};

/**
 * Sorts events in descending order based on the event date.
 * @param {Event[]} events - The events array to sort.
 * @returns {Event[]} - Sorted array of events.
 */
const getSortedEvents = (events: Event[]): Event[] =>
  events.sort((a, b) => convertToIST(b.eventDate).getTime() - convertToIST(a.eventDate).getTime());

/**
 * Adds a single event to the RSS feed.
 * @param {RSS} feed - The RSS feed instance.
 * @param {Event} event - The event data to be added to the feed.
 */

const addEventToFeed = (feed: RSS, event: Event): void => {
  const istDate = new Date(
    new Date(event.eventDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );

  feed.item({
    title: event.eventName,
    description: event.eventDescription,
    date: istDate,
    url: event.eventLink
  });
};
