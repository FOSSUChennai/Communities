import Link from 'next/link';
import GitHubButton from '../github-button';
import DarkModeToggle from './DarkModeToggle';
export default function Header() {
  return (
    <nav className='flex w-full items-center justify-between bg-[#fafafa] px-4 py-4 text-black dark:bg-[#111827] dark:text-white md:px-8 lg:px-16'>
      <Link href='/' className='flex h-full items-center text-xl font-semibold'>
        tamilnadu.tech
      </Link>
      <div className='flex h-full items-center space-x-4'>
        <GitHubButton />
        <DarkModeToggle />
      </div>
    </nav>
  );
}
