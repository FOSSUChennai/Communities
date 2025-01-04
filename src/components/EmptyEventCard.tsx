import { CalendarX } from 'phosphor-react';

const EmptyEventCard = ({
  message = 'No events scheduled for this period'
}: {
  message?: string;
}) => {
  return (
    <div className='col-span-full flex flex-col items-center justify-center rounded-xl border border-2 border-gray-200 bg-gray-50 p-8'>
      <CalendarX size={48} className='mb-4 text-gray-400' weight='thin' />
      <p className='text-center text-lg text-gray-500'>{message}</p>
      <p className='mt-2 text-center text-sm text-gray-400'>Check back later for updates</p>
    </div>
  );
};

export default EmptyEventCard;
