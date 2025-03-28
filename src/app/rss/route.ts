import { NextResponse } from 'next/server';
import events from '@/data/events.json';
import jsonfeedToRss from 'jsonfeed-to-rss';

export async function GET() {
  const baseUrl = 'https://tamilnadu.tech';
  const currentDate = new Date();

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'Tamil Nadu Tech Events - Upcoming',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/rss`,
    description: 'Upcoming tech events in Tamil Nadu',
    items: events
      .filter((event) => new Date(event.eventDate) >= currentDate)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
      .map((event) => ({
        id: event.eventLink,
        url: event.eventLink,
        title: event.eventName,
        content_html: `
          <p>${event.eventDescription}</p>
          <p><strong>Date:</strong> ${event.eventDate}</p>
          <p><strong>Time:</strong> ${event.eventTime}</p>
          <p><strong>Venue:</strong> ${event.eventVenue}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Community:</strong> ${event.communityName}</p>
        `,
        date_published: new Date(event.eventDate).toISOString(),
        date_modified: new Date(event.eventDate).toISOString(),
        authors: [{ name: event.communityName }],
        tags: ['tech', 'events', event.location.toLowerCase()],
        image: event.communityLogo
      }))
  };

  const rss = jsonfeedToRss(jsonFeed);

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
