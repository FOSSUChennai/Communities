import Image from 'next/image';
import Add2Calendar from '../../public/add2Calendar.webp';

interface AddToCalendarProps {
  eventTitle: string;
  eventVenue: string;
  eventDate: string;
  eventEndDate?: string;
  eventLink: string;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({
  eventTitle,
  eventVenue,
  eventDate,
  eventEndDate,
  eventLink
}) => {
  const dateFormatter = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const addDays = (date: Date, days: number): Date => {
    const updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + days);
    return updatedDate;
  };

  const getCalendarUrl = (): string => {
    const startDate = new Date(eventDate);
    const inclusiveEndDate = eventEndDate ? new Date(eventEndDate) : startDate;
    const exclusiveEndDate = addDays(inclusiveEndDate, 1);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      details: `Read on this page ${eventLink}`,
      location: eventVenue,
      dates: `${dateFormatter(startDate)}/${dateFormatter(exclusiveEndDate)}`
    });

    const baseUrl = 'https://calendar.google.com/calendar/render';
    return `${baseUrl}?${params.toString()}`;
  };

  const calendarUrl = getCalendarUrl();

  return (
    <a
      href={calendarUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Add event to Google Calendar'
    >
      <Image src={Add2Calendar} alt='CalendarIcon' style={{ width: '20px', height: '20px' }} />
    </a>
  );
};

export default AddToCalendar;
