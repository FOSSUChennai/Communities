export default function Footer() {
  return (
    <footer className='mx-4 mt-16 md:mx-8 lg:mx-16'>
      <div className='relative flex w-full flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white/80 px-4 py-6 text-black backdrop-blur dark:border-white/10 dark:bg-zinc-900/80 dark:text-white md:flex-row md:px-8'>
        {/* moving glow */}
        <span className='pointer-events-none absolute inset-0 z-0 opacity-70 [mask:linear-gradient(90deg,transparent,black,transparent)]'>
          <span className='absolute -inset-x-1 inset-y-0 bg-[linear-gradient(90deg,transparent,rgba(3,176,81,0.6),transparent)] blur-3xl [animation:glow-sweep_5s_linear_infinite] dark:bg-[linear-gradient(90deg,transparent,rgba(3,176,81,0.85),transparent)]' />
        </span>
        <div className='text-center md:text-left'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Made with luv from Hari and Justin 💚
          </p>
          <p className='mt-1 text-sm'>
            <a href='https://fossunited.org/c/chennai' className='text-[#03b051] hover:underline'>
              FOSS United Chennai
            </a>
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <a
            href='/archive'
            className='rounded-full px-4 py-2 text-sm text-black transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/10'
          >
            Events Archive
          </a>
        </div>
      </div>
      <div className='mt-3 text-center text-xs text-gray-500 dark:text-gray-500'>
        © {new Date().getFullYear()} Tamil Nadu Tech Community
      </div>
    </footer>
  );
}
