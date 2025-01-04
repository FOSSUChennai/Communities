"use client";
import React, { useEffect, useRef, useState } from "react";
import events from "../data/events.json";
import { MapPin } from "phosphor-react";
import EmptyEventCard from "../components/EmptyEventCard";
import Image from "next/image";

type EventCardProps = {
  communityName: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  link: string;
  logo?: string;
};

const Events = () => {
  const EventCard: React.FC<EventCardProps> = ({
    communityName,
    title,
    date,
    location,
    venue,
    link,
    logo,
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
            communityNameRef.current.scrollWidth >
              communityNameRef.current.clientWidth,
          );
        }
      };

      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      return () => window.removeEventListener("resize", checkOverflow);
    }, [communityName]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer relative block p-[2px] rounded-lg group transition-all duration-300 "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: mousePosition
              ? `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(74, 222, 128), transparent 70%)`
              : "none",
            maskImage: "linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        <div className="hover:shadow-md transition-shadow bg-white rounded-lg p-4 shadow-sm relative  h-full border-2 border-[rgb(229,231,235)] hover:border-[rgb(255,255,255,0.5)]">
          <div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            style={{
              background: mousePosition
                ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
                : "none",
            }}
          />
          <div className="flex items-center justify-between gap-2 relative">
            {isOverflowing ? (
              <Tooltip content={communityName}>
                <div className="bg-white text-black border-2 border-black text-xs px-2 py-1 rounded-md">
                  <span
                    ref={communityNameRef}
                    className="block truncate max-w-[200px]"
                  >
                    {communityName}
                  </span>
                </div>
              </Tooltip>
            ) : (
              <div className="bg-white text-black border-2 border-black text-xs px-2 py-1 rounded-md">
                <span
                  ref={communityNameRef}
                  className="block truncate max-w-[200px]"
                >
                  {communityName}
                </span>
              </div>
            )}
            {logo && (
              <img
                src={logo}
                alt={`${title} logo`}
                className="w-6 h-6 rounded-full filter grayscale hover:filter-none transition-all duration-300 object-cover"
              />
            )}
          </div>

          <h3
            className="text-xl text-black font-medium mt-3 mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300"
            title={title}
          >
            {title}
          </h3>

          <div className="flex-row items-center text-sm text-gray-600 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                {location}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                {date}
              </span>
            </div>

            <span className="text-xs flex items-start pt-8 mb-2">
              <MapPin size={16} />
              {venue}
            </span>
          </div>
        </div>
      </a>
    );
  };

  const monthlyEvents = events.filter((event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.eventDate);
    return eventDate.getMonth() === currentDate.getMonth();
  });

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    const currentDate = new Date();

    const eventYear = eventDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const eventMonth = eventDate.getMonth();
    const currentMonth = currentDate.getMonth();

    return (
      (eventYear === currentYear && eventMonth > currentMonth) ||
      eventYear > currentYear
    );
  });

  return (
    <main className="p-4 mx-4 md:mx-8 lg:mx-16 bg-white rounded-xl">
      <section>
        <h2 className="text-lg font-normal mb-3 ">
          <span className="text-black font-semibold text-[30px]">
            this month
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {monthlyEvents.length > 0 ? (
            monthlyEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                location={event.location}
                title={event.eventName}
                date={event.eventDate}
                venue={event.eventVenue}
                link={event.eventLink}
                logo={event.communityLogo}
              />
            ))
          ) : (
            <EmptyEventCard message="No events scheduled for this month" />
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-normal mb-3 ">
          <span className="text-black font-semibold text-[30px]">upcoming</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                communityName={event.communityName}
                title={event.eventName}
                location={event.location}
                date={event.eventDate}
                venue={event.eventVenue}
                link={event.eventLink}
                logo={event.communityLogo}
              />
            ))
          ) : (
            <EmptyEventCard message="No upcoming events scheduled" />
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-50 px-2 py-1 text-xs text-gray-800  border-2 border-black bg-gray-100 rounded-md whitespace-nowrap -top-12 shadow-lg left-1/2 transform -translate-x-1/2">
          {content}
          <div className="absolute w-2 h-2 bg-gray-100 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
}
