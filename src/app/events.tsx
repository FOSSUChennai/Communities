"use client"
import React, { useEffect, useState } from "react";
import events from '../data/events.json';
import { MapPin } from 'phosphor-react';
import EmptyEventCard from '../components/EmptyEventCard'
import Image from 'next/image';

type EventCardProps = {
    communityName: string;
    title: string;
    date: string;
    location: string;
    venue: string;
    link: string;
    logo?: string;
    maplink:string;
};

const Events = () => {
    const EventCard: React.FC<EventCardProps> = ({ communityName, title, date, location, venue, link, logo ,maplink}) => {
        const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number } | null>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
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
                            : 'none',
                        maskImage: 'linear-gradient(#000 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                    }}
                />
                <div 
                    className="hover:shadow-md transition-shadow bg-white rounded-lg p-4 shadow-sm relative overflow-hidden h-full border-2 border-[rgb(229,231,235)] hover:border-[rgb(255,255,255,0.5)]"
                >
                    <div 
                        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                        style={{
                            background: mousePosition
                                ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.2), transparent 40%)`
                                : 'none'
                        }}
                    />
                    <div className='bg-[#4CAF50] flex justify-center items-center z-10 absolute -mt-4 -ml-4 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100'>
                        <div className="flex flex-col justify-center  gap-4">
                            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors" onClick={() => window.open(maplink)}>
                                View on map
                            </button>
                            <button className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors" onClick={() => window.open(link)}>
                                Register now
                            </button>
                        </div>
                    </div>

                    {logo && (
                        <div className="absolute top-3 right-3">
                            <Image 
                                src={logo} 
                                alt={`${communityName} logo`} 
                                width={24}
                                height={24}
                                className="rounded-full filter grayscale group-hover:filter-none transition-all duration-300 object-cover"
                            />
                        </div>
                    )}
                    <div className="inline-block bg-white border-2 border-black text-black text-xs px-2 py-1 rounded-md">
                        {communityName}
                    </div>

                    <h3 className="text-xl text-black font-medium mt-3 mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300" 
                        title={title}>
                        {title}
                    </h3>
                    <div className="flex-row items-center text-sm text-gray-600 space-y-2">
                        <div className='flex items-center space-x-2'>
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                {location}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                {date}
                            </span>
                        </div>
                        <Countdown  eventDate={date} />
                        
                        <span className="text-xs flex items-start pt-4 mb-2" onClick={() => window.open(maplink)}>
                            <MapPin size={16} />
                            {venue}
                        </span>
                    </div>
                </div>
            </a>
        );
    };

    interface CountdownProps {
        eventDate: string;
      }
      
      const Countdown: React.FC<CountdownProps> = ({ eventDate }) => {
        const [daysLeft, setDaysLeft] = useState<number>(0);
      
        useEffect(() => {
          const calculateDaysLeft = () => {
            const event = new Date(eventDate);
            const today = new Date();
            const diffTime = event.getTime() - today.getTime();
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysLeft(days > 0 ? days : 0);
          };
          calculateDaysLeft();
          //interval to update daily
          const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24);
      

          return () => clearInterval(timer);
        }, []);  
      
        return (
          <p className="text-green-800 font-medium">
            Starts in <span className="font-bold">{daysLeft === 0 ? "Today!" : `${daysLeft} days`}</span>
          </p>
        );
      };

    const monthlyEvents = events.filter(event => {
        const currentDate = new Date();
        const eventDate = new Date(event.eventDate);
        return eventDate.getMonth() === currentDate.getMonth(); 
    });

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        const currentDate = new Date();
    
        const eventYear = eventDate.getFullYear();
        const currentYear = currentDate.getFullYear();
        const eventMonth = eventDate.getMonth();
        const currentMonth = currentDate.getMonth();

        return (eventYear === currentYear && eventMonth > currentMonth) || (eventYear > currentYear);
    });
    

    return (
        <main className="p-4 mx-4 md:mx-8 lg:mx-16 bg-white rounded-xl">
            <section>
                <h2 className="text-lg font-normal mb-3 ">
                    <span className='text-black font-semibold text-[30px]'>this month</span>
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
                                maplink={event.map}
                            />
                        ))
                    ) : (
                        <EmptyEventCard message="No events scheduled for this month" />
                    )}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-lg font-normal mb-3 ">
                    <span className='text-black font-semibold text-[30px]'>upcoming</span>
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
                                maplink={event.map}
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
