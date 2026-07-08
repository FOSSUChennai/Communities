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

function isValidEventArray(data: unknown): data is Event[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof (item as Event).eventName === 'string' &&
        typeof (item as Event).eventDate === 'string' &&
        typeof (item as Event).eventVenue === 'string'
    )
  );
}

async function getPastEvents(): Promise<Event[]> {
  if (process.env.NODE_ENV === 'development') {
    return pastEvents as Event[];
  }

  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/pastevents.json',
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    );
    if (!response.ok) {
      return pastEvents as Event[];
    }
    const data = await response.json();
    return isValidEventArray(data) ? data : (pastEvents as Event[]);
  } catch (error) {
    console.error('Error fetching past events:', error);
    return pastEvents as Event[];
  }
}

export default async function Communities() {
  const events = await getPastEvents();
  return <Archive initialEvents={events} />;
}
