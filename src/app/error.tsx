'use client';
type PageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function ErrorPage(props: PageProps) {
  const { error, reset } = props;

  // TODO: Need to add a custom error page

  return (
    <div className='h-content space-y-4 px-2 py-8'>
      <h1 className='text-2xl font-bold dark:text-white'>Something went wrong!</h1>
      <button onClick={reset} type='button' className='dark:text-gray-300'>
        Oops! Something went wrong. Try again
      </button>
      <p className='break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800 dark:text-gray-300'>
        {error.message}
      </p>
    </div>
  );
}
