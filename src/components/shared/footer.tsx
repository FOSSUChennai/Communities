export default function Footer() {
  return (
    <footer className='flex w-full flex-1 flex-col items-center justify-center bg-[var(--background)] px-4 py-4 text-[var(--foreground)] md:px-8 lg:px-16'>
      <div className='mb-2 mt-16 text-center text-[var(--muted-foreground)]'>
        <div>
          Made with luv from Hari and Justin 💚
          <a
            href='https://fossunited.org/c/chennai'
            className='ml-2 text-[#03b051] transition-colors hover:text-[#04d263]'
          >
            FOSS United Chennai
          </a>
        </div>

        <a
          href='/archive'
          className='mt-4 text-[var(--foreground)] underline transition-colors hover:text-[var(--muted-foreground)]'
        >
          Events Archive
        </a>
      </div>
    </footer>
  );
}
