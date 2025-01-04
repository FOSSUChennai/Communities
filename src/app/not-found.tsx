import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404'
};

export default function NotFoundPage() {
  // TODO: Need to add a custom 404 page
  return (
    <div className='mb-40 mt-52 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>404 Not Found</h1>
      <Link className='text-2xl font-bold text-blue-500 hover:text-blue-700' href='/'>
        Go back home
      </Link>
    </div>
  );
}
