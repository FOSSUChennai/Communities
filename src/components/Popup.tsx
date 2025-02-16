'use client';
import { useState } from 'react';

interface PopupProps {
  sendData: (data: { isChecked: boolean; option: string }) => void;
}

const Popup: React.FC<PopupProps> = ({ sendData }) => {
  // const [isPopup,setIsPopup] = useState(true)
  const [Option, setOption] = useState('google');
  const [remember, setRemember] = useState(false);

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setOption(e.target.value);
  };
  const handleCheked = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRemember(e.target.checked);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    sendData({ isChecked: remember, option: Option });
    if (remember) {
      localStorage.setItem('preff-Calendar', Option);
    }
  };

  return (
    <>
      <div
        onClick={(e) => e.preventDefault()}
        className='fixed left-1/2 top-1/2 z-10 w-1/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700'
      >
        <h1 className='pb-4 pt-2'>Select Your Event Calendar</h1>
        <select
          value={Option}
          onChange={handleOption}
          name='Calendar-selection'
          id='calendar-selection'
          className='rounded-md border p-2'
        >
          <option value='google'>Google Calendar</option>
          <option value='outlook'>Outlook Calendar</option>
          <option value='download'>Download ICS</option>
        </select>
        <div className='flex items-center gap-1 py-2'>
          <input type='checkbox' checked={remember} onChange={handleCheked} id='agree' />
          <label htmlFor='agree' className='text-xs'>
            Remember my choice
          </label>
        </div>
        <button
          onClick={handleSave}
          className='w-full rounded-md bg-blue-200 py-2 text-center text-blue-800'
        >
          Add Event
        </button>
      </div>
    </>
  );
};

export default Popup;
