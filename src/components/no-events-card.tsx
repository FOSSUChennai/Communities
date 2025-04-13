import { CalendarX } from '@phosphor-icons/react';

export default function EmptyEventCard({
  message = 'No events scheduled for this period'
}: {
  message?: string;
}) {
  return (
    <div className='col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-50 p-8 dark:border-2 dark:border-gray-300 dark:bg-[#212F36]'>
      <CalendarX size={48} className='mb-4 text-gray-400' weight='light' />
      <p className='text-center text-lg text-gray-500 dark:text-gray-400'>{message}</p>
      <p className='mt-2 text-center text-sm text-gray-400 dark:text-gray-200'>
        Check back later for updates
      </p>
    </div>
  );
}
