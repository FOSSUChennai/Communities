'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin, Warning } from '@phosphor-icons/react';
import AddToCalendar from '@/components/AddToCalendar';

export interface EventCardProps {
  communityName: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  venue: string;
  time: string;
  endTime?: string;
  link: string;
  logo?: string;
  alert?: {
    message: string;
    type?: 'postponed' | 'venue-change' | 'cancelled' | 'general';
  };
}

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

const EventCard: React.FC<EventCardProps> = ({
  communityName,
  title,
  date,
  endDate,
  location,
  venue,
  time,
  endTime,
  link,
  logo,
  alert
}) => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [tooltipPlacement, setTooltipPlacement] = useState<'left' | 'right' | 'center'>('left');
  const communityNameRef = useRef<HTMLSpanElement>(null);
  const alertContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAlert && alertContainerRef.current) {
      const rect = alertContainerRef.current.getBoundingClientRect();
      const tooltipWidth = 256;
      if (rect.left + tooltipWidth > window.innerWidth) {
        setTooltipPlacement('right');
      } else if (rect.left < tooltipWidth / 2) {
        setTooltipPlacement('center');
      } else {
        setTooltipPlacement('left');
      }
    }
  }, [showAlert]);

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
    return venue.trim();
  };

  const formattedDate = endDate && endDate !== date ? `${date} to ${endDate}` : date;
  const formattedTime = endTime && endTime !== time ? `${time} to ${endTime}` : time;

  return (
    <div
      className='group relative block cursor-pointer rounded-lg p-[2px] transition-all duration-300'
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
      <div className='relative flex min-h-[250px] flex-col rounded-lg border-2 border-[rgb(229,231,235)] bg-white p-4 shadow-sm transition-shadow hover:border-[rgb(255,255,255,0.5)] hover:shadow-md'>
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-50'
          style={{
            background: mousePosition
              ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
              : 'none'
          }}
        />
        <div className='relative flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
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
            {alert && (
              <div
                ref={alertContainerRef}
                className='relative'
                onMouseEnter={() => setShowAlert(true)}
                onMouseLeave={() => setShowAlert(false)}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAlert(!showAlert);
                  }}
                  onFocus={() => setShowAlert(true)}
                  onBlur={() => setShowAlert(false)}
                  className='relative rounded-full bg-yellow-400 p-1.5 text-yellow-900 shadow-md transition-colors hover:bg-yellow-500'
                  aria-label='Event alert'
                  aria-expanded={showAlert}
                >
                  <Warning size={16} weight='fill' />
                </button>

                {showAlert && (
                  <div
                    className={`absolute top-8 z-50 w-64 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-3 shadow-lg ${
                      tooltipPlacement === 'right'
                        ? 'left-auto right-0'
                        : tooltipPlacement === 'center'
                          ? 'left-1/2 -translate-x-1/2'
                          : 'left-0'
                    }`}
                  >
                    <div>
                      <p className='text-sm font-semibold text-yellow-900'>
                        {alert.type === 'postponed' && 'Event Postponed'}
                        {alert.type === 'venue-change' && 'Venue Changed'}
                        {alert.type === 'cancelled' && 'Event Cancelled'}
                        {(!alert.type ||
                          alert.type === 'general' ||
                          !['postponed', 'venue-change', 'cancelled'].includes(alert.type)) &&
                          'Important Notice'}
                      </p>
                      <p className='mt-1 text-xs text-yellow-800'>{alert.message}</p>
                    </div>
                    <div className='absolute -top-2 left-4 h-3 w-3 rotate-45 border-l-2 border-t-2 border-yellow-300 bg-yellow-50' />
                  </div>
                )}
              </div>
            )}
          </div>
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

        <div className='flex flex-1 flex-col'>
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='block'
            aria-label={`View details for ${title} event`}
          >
            <h3
              className='mb-2 mt-3 line-clamp-3 text-xl font-medium text-black transition-all duration-300'
              title={title}
            >
              {title}
            </h3>
          </a>

          <div className='mt-auto flex-row items-center text-sm text-gray-600'>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800'>
                {location}
              </span>
              <span className='rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800'>
                {formattedDate}
              </span>
              <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800'>
                {formattedTime}
              </span>
              <span className='shrink-0'>
                <AddToCalendar
                  eventTitle={title}
                  eventVenue={venue}
                  eventDate={date}
                  eventEndDate={endDate}
                  eventLink={link}
                />
              </span>
            </div>
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-4 flex items-start gap-1 text-xs'
              aria-label={`View details for ${title} event venue`}
            >
              <MapPin size={16} className='mt-0.5 min-w-[16px]' />
              <span className='break-words'>{validateAndFormatVenue(venue)}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
