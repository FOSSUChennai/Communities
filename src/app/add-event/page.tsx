import type { Metadata } from 'next';
import AddEventForm from '@/components/pages/add-event/AddEventForm';

export const metadata: Metadata = {
  title: 'Add an Event | tamilnadu.tech',
  description:
    'Generate a valid events.json entry and open a GitHub PR to add your event to tamilnadu.tech.'
};

export default function AddEventPage() {
  return (
    <main className='container-page py-12 font-inter'>
      <div className='surface p-6 sm:p-8'>
        <h1 className='section-title'>Add an event</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Fill in the details, then copy/download the JSON and open a PR.
        </p>

        <div className='mt-8'>
          <AddEventForm />
        </div>
      </div>
    </main>
  );
}
