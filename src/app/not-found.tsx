import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageNotFoundImg from '../../public/pageNotFound.svg';
export const metadata: Metadata = {
  title: '404'
};

export default function NotFoundPage() {
  // TODO: Need to add a custom 404 page
  return (
    <div className='mb-30 mt-4 flex flex-col items-center justify-center gap-10'>
      <Image src={PageNotFoundImg} alt='' className='size-[20rem]' />
      <h1 className='bg-gradient-to-tr from-[#03B051] to-green-400 bg-clip-text text-center text-5xl font-bold text-transparent'>
        404 Not Found
      </h1>
      <Link
        className='bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-2xl font-bold text-transparent hover:text-blue-700'
        href='/'
      >
        Go back home
      </Link>
    </div>
  );
}
