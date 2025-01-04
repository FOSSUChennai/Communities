import Link from 'next/link';
import Image from 'next/image';
import { GITHUB_REPO_URL } from '@/lib/constants';
import { GrGithub } from 'react-icons/gr';
import { LiaDiscord } from 'react-icons/lia';

export default function Header() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: GITHUB_REPO_URL,
      icon: GrGithub
    },
    {
      name: 'Discord',
      url: 'https://disord.com',
      icon: LiaDiscord
    }
    // {
    //   name: 'YouTube',
    //   url: 'https://www.youtube.com/@fossunitedchennai',
    //   icon: SlSocialYoutube
    // }
  ];
  return (
    <nav className='bg-white-900 text-black-100 flex w-full flex-1 items-center justify-between px-4 py-4 dark:bg-gray-800 dark:text-gray-500 md:px-8 lg:px-16'>
      <Link
        href='/'
        className='flex items-center gap-2 font-medium dark:text-gray-300 sm:text-sm md:text-lg'
      >
        <Image
          src='/assets/logo.png'
          alt='logo'
          width={20}
          height={20}
          className='h-4 w-4 md:h-5 md:w-5'
        />
        <p> tamilnadu.tech</p>
      </Link>
      <div className='flex items-center gap-4 md:gap-6'>
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target='_blank' rel='noopener noreferrer'>
            <link.icon width={20} height={20} className='h-6 w-6 hover:text-gray-500' />
          </a>
        ))}
      </div>
    </nav>
  );
}
