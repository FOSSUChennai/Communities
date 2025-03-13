export default function Footer() {
  return (
    <footer className='flex w-full flex-1 flex-col items-center justify-center bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <div className='flex gap-4 mb-4'>
        <a
          href='/Communities'
          className='px-4 py-2 text-gray-600 hover:text-[#03b051] transition-colors rounded-lg'
        >
          Communities
        </a>
      </div>
      <p className='text-center text-gray-600'>
        Made with luv from Hari and Justin 💚
        <a href='https://fossunited.org/c/chennai' className='ml-2 text-[#03b051]'>
          FOSS United Chennai
        </a>
      </p>
    </footer>
  );
}
