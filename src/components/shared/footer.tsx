export default function Footer() {
  return (
    <footer className='flex w-full flex-1 items-center justify-center bg-[#fafafa] px-4 py-4 text-black transition-colors duration-300 dark:bg-gray-900 dark:text-white md:px-8 lg:px-16'>
      <p className='mb-2 mt-16 text-center text-gray-600 dark:text-gray-400'>
        Made with luv from Hari and Justin 💚
        <a
          href='https://fossunited.org/c/chennai'
          className='ml-2 text-[#03b051] hover:text-[#028a40] dark:text-[#05d462] dark:hover:text-[#03b051]'
        >
          FOSS United Chennai
        </a>
      </p>
    </footer>
  );
}
