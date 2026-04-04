export default function Footer() {
  return (
    <footer className='flex w-full flex-1 flex-col items-center justify-center bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <div className='mb-2 mt-16 text-center text-gray-600'>
        <div>
          Made with luv from Hari and Justin 💚
          <a href='https://fossunited.org/c/chennai' className='ml-2 text-[#03b051] underline'>
            FOSS United Chennai
          </a>
        </div>

        <a href='/archive' className='mt-4 text-[#042613] underline'>
          Events Archive
        </a>

        <a
          href='https://wiki.tamilnadu.tech'
          target='_blank'
          className='ml-8 mt-4 text-[#042613] underline'
        >
          wiki.tamilnadu.tech
        </a>
      </div>
    </footer>
  );
}
