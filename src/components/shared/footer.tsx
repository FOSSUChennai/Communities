export default function Footer() {
  return (
    <footer className='flex w-full flex-1 flex-col items-center justify-center bg-[#fafafa] px-4 py-4 text-black dark:bg-[#0f0f0f] dark:text-white md:px-8 lg:px-16'>
      <div className='mb-2 mt-16 text-center text-gray-600 dark:text-gray-400'>
        <div>
          Made with luv from Hari and Justin 💚
          <a
            href='https://fossunited.org/c/chennai'
            className='ml-2 text-[#03b051] transition-colors duration-200 hover:underline dark:text-[#14ff92]'
          >
            FOSS United Chennai
          </a>
        </div>

        <a
          href='/archive'
          className='mt-4 inline-block text-[#042613] underline transition-colors duration-200 hover:text-green-800 dark:text-[#a0f7a4] dark:hover:text-green-400'
        >
          Events Archive
        </a>
      </div>
    </footer>
  );
}
