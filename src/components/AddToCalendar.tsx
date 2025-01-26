import Image from 'next/image';
import Add2Calendar from '../../public/add2Calendar.webp';
import Popup from './Popup';
import { useState } from 'react';

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
  const [isPopup, setIsPopup] = useState(false);
  const [PopupData, setPopupData] = useState({
    isChecked: false,
    option: ''
  });
  console.log(PopupData);
  const dateFormatter = (formatDate: string): string => {
    const date = new Date(formatDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handlePopupData = (data: { isChecked: boolean; option: string }) => {
    setPopupData(data);
  };

  const handleRedirect = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const value = localStorage.getItem('preff-Calendar');
    console.log(value, PopupData.isChecked, PopupData.option);
    if (!value && !PopupData.isChecked && !PopupData.option) {
      setIsPopup(true);
      return;
    }
    if (PopupData.option.toString() === 'google' || value === 'google') {
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
    } else if (PopupData.option.toString() === 'outlook' || value === 'outlook') {
      event.preventDefault();
      const params = new URLSearchParams({
        path: '/calendar/action/compose',
        subject: eventTitle,
        body: `Read on this page ${eventLink}`,
        location: eventVenue,
        startdt: dateFormatter(eventDate),
        enddt: dateFormatter(eventDate)
      });
      const baseUrl = 'https://outlook.office.com';
      const url = `${baseUrl}?${params.toString()}`;
      window.open(url, '_blank');
    }
  };

  return (
    <>
      {isPopup ? (
        <Popup sendData={handlePopupData} />
      ) : (
        <button onClick={handleRedirect}>
          <Image src={Add2Calendar} alt='CalendarIcon' style={{ width: '20px', height: '20px' }} />
        </button>
      )}
    </>
  );
};

export default AddToCalendar;
