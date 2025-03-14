import { CalendarX, MapPin } from 'phosphor-react';

export default function EmptyEventCard({ message, location, date }: { message: string; location: string; date: string }) {
  return (
    <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
      {/* Floating Badge */}
      <span className="absolute -top-3 right-4 rounded-md bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
        Upcoming
      </span>

      {/* Icon Section */}
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 shadow-md">
        <CalendarX size={36} className="text-white" weight="bold" />
      </div>

      {/* Event Details */}
      <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{message}</p>

      <div className="mt-2 flex items-center gap-2 text-gray-700 dark:text-gray-400">
        <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
        <p className="text-sm">{location}</p>
      </div>

      <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{date}</p>

      {/* CTA Button */}
      <button className="mt-4 w-full rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700">
        View Event
      </button>
    </div>
  );
}
