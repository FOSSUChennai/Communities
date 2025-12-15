export default function Footer() {
  return (
    <footer className='mt-16 w-full border-t border-gray-200 bg-background'>
      <div className='container-page py-10 text-center text-sm text-gray-600'>
        <div className='leading-relaxed'>
          Made with luv from Hari and Justin
          <a
            href='https://fossunited.org/c/chennai'
            className='ml-2 font-medium text-green-700 underline decoration-green-300 underline-offset-4 hover:text-green-800'
          >
            FOSS United Chennai
          </a>
        </div>

        <div className='mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
          <a
            href='/archive'
            className='font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-gray-900'
          >
            Events Archive
          </a>

          <a
            href='https://wiki.tamilnadu.tech'
            target='_blank'
            className='font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-gray-900'
            rel='noreferrer'
          >
            wiki.tamilnadu.tech
          </a>
        </div>
      </div>
    </footer>
  );
}
