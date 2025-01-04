import Link from 'next/link';
import GitHubButton from '../github-button';

export default function Header() {
  return (
    <nav className='flex w-full flex-1 items-center justify-between bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <Link href='/' className='text-xl font-semibold'>
        tamilnadu.tech
      </Link>
      <div className='space-x-4'>
        <GitHubButton />
      </div>
    </nav>
  );
}
