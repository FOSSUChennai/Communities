import { CalendarX } from '@phosphor-icons/react';

export default function EmptyEventCard({
  message = 'No events scheduled for this period'
}: {
  message?: string;
}) {
  return (
    <div className='col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-[var(--border)] bg-[var(--muted)] p-8'>
      <CalendarX size={48} className='mb-4 text-[var(--muted-foreground)]' weight='light' />
      <p className='text-center text-lg text-[var(--muted-foreground)]'>{message}</p>
      <p className='mt-2 text-center text-sm text-[var(--muted-foreground)] opacity-75'>
        Check back later for updates
      </p>
    </div>
  );
}
