export interface Event {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLink: string;
  location: string;
  communityName: string;
  communityLogo: string;
  alert?: {
    message: string;
    type?: 'postponed' | 'venue-change' | 'cancelled' | 'general';
  };
}
