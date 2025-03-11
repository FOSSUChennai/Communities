import RSS from 'rss';
import { NextResponse } from 'next/server';

import Events from '@/data/events.json';
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

  const sortedEvents = getSortedEvents();

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
 * Sorts events in descending order based on the event date.
 * @returns {Events[]} - Sorted array of events.
 */
const getSortedEvents = (): Event[] =>
  Events.sort((a, b) => convertToIST(b.eventDate).getTime() - convertToIST(a.eventDate).getTime());

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
