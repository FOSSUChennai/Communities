import Archive from '@/components/pages/Archive/archive';
import pastEvents from '@/data/pastevents.json';

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

async function getPastEvents(): Promise<Event[]> {
  if (process.env.NODE_ENV === 'development') {
    return pastEvents as Event[];
  }

  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/pastevents.json',
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      return pastEvents as Event[];
    }
    return (await response.json()) as Event[];
  } catch (error) {
    console.error('Error fetching past events:', error);
    return pastEvents as Event[];
  }
}

export default async function Communities() {
  const events = await getPastEvents();
  return <Archive initialEvents={events} />;
}
