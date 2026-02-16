'use client';
type PageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function ErrorPage(props: PageProps) {
  const { error, reset } = props;
  return (
    <div className='flex h-screen flex-col items-center justify-center p-4'>
      <div className='relative flex w-full max-w-md -translate-y-10 flex-col items-center space-y-5 rounded-xl border border-pink-100 bg-white p-8 shadow-xl'>
        <div className='rounded-full bg-red-50 p-4 shadow-inner'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 text-red-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>

        <h1 className='text-2xl font-semibold text-gray-800'>Something went wrong!</h1>
        <p className='text-center text-gray-600'>
          Oops! An unexpected error has occurred. Please try again.
        </p>

        <div className='w-full rounded-lg border border-red-400 bg-red-50 p-4'>
          <p className='break-words text-sm text-red-600'>
            <strong>Error:</strong> {error.message}
          </p>
        </div>

        <button
          onClick={reset}
          type='button'
          className='w-full rounded-md bg-green-500 py-2 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
