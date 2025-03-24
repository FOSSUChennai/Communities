'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin } from '@phosphor-icons/react';
import AddToCalendar from '@/components/AddToCalendar';

export interface EventCardProps {
  communityName: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  link: string;
  logo?: string;
  isMonthly?: boolean;
  cardHeight?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  communityName,
  title,
  date,
  location,
  venue,
  link,
  logo
}) => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const communityNameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (communityNameRef.current) {
        setIsOverflowing(
          communityNameRef.current.scrollWidth > communityNameRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [communityName]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const validateAndFormatVenue = (venue: string): string => {
    return venue
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div
      className='group relative block h-[250px] cursor-pointer rounded-lg p-[2px] transition-all duration-300'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        style={{
          background: mousePosition
            ? `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(74, 222, 128), transparent 70%)`
            : 'none',
          maskImage: 'linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor'
        }}
      />
      <div className='relative flex h-full flex-col rounded-lg border-2 border-[rgb(229,231,235)] bg-white p-4 shadow-sm transition-shadow hover:border-[rgb(255,255,255,0.5)] hover:shadow-md'>
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-50'
          style={{
            background: mousePosition
              ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
              : 'none'
          }}
        />
        <div className='relative flex flex-wrap items-center justify-between gap-2'>
          {isOverflowing ? (
            <Tooltip content={communityName}>
              <div className='rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black'>
                <span ref={communityNameRef} className='block max-w-[200px] truncate'>
                  {communityName}
                </span>
              </div>
            </Tooltip>
          ) : (
            <div className='rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black'>
              <span ref={communityNameRef} className='block max-w-[200px] truncate'>
                {communityName}
              </span>
            </div>
          )}
          {logo && (
            <Image
              src={logo}
              alt={`${title} logo`}
              width={24}
              height={24}
              className='rounded-sm object-cover filter transition-all duration-300 hover:filter-none'
            />
          )}
        </div>

        <a href={link} target='_blank' rel='noopener noreferrer' className='flex h-full flex-col'>
          <h3
            className='mb-2 mt-3 line-clamp-3 text-xl font-medium text-black transition-all duration-300'
            title={title}
          >
            {title}
          </h3>

          <div className='mt-auto flex-row items-center text-sm text-gray-600'>
            <div className='flex items-center space-x-2'>
              <span className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800'>
                {location}
              </span>
              <span className='rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800'>{date}</span>
              <AddToCalendar
                eventTitle={title}
                eventVenue={venue}
                eventDate={date}
                eventLink={link}
              />
            </div>
            <div className='mt-2 flex flex-grow flex-row justify-start'>
              <span className='flex items-center gap-1 text-xs'>
                <MapPin size={16} className='min-w-[16px]' />
                <span className='break-words'>{validateAndFormatVenue(venue)}</span>
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className='relative inline-block'>
      <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {children}
      </div>
      {showTooltip && (
        <div className='absolute -top-12 left-1/2 z-50 -translate-x-1/2 transform whitespace-nowrap rounded-md border-2 border-gray-800 bg-gray-100 px-2 py-1 text-xs text-gray-800 shadow-lg'>
          {content}
          <div className='absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-100' />
        </div>
      )}
    </div>
  );
}

export default EventCard;
