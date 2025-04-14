import { BiCalendar } from 'react-icons/bi';

interface AddToCalendarProps {
  eventTitle: string;
  eventVenue: string;
  eventDate: string; // Assuming eventDate is a string (ISO date or similar). Adjust as needed.
  eventLink: string;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({
  eventTitle,
  eventVenue,
  eventDate,
  eventLink
}) => {
  const dateFormatter = (formatDate: string): string => {
    const date = new Date(formatDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleRedirect = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      details: `Read on this page ${eventLink}`,
      location: eventVenue,
      dates: `${dateFormatter(eventDate)}/${dateFormatter(eventDate)}`
    });
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleRedirect}>
      <BiCalendar size={17} />
    </button>
  );
};

export default AddToCalendar;
