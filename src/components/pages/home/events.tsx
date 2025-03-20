
"use client";

import React, { useState, useEffect } from "react";
import events from "../../../data/events.json";
import Select from "react-select";
import { MapPin } from "phosphor-react";
import EmptyEventCard from "../../no-events-card";
import Image from "next/image";
import AddToCalendar from "@/components/AddToCalendar";


type Event = {
  communityName: string;
  communityLogo: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  eventLink: string;
  location: string;
};

type EventCardProps = {
  communityName: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  link: string;
  logo?: string;
};

const EventCard: React.FC<EventCardProps> = ({
  communityName,
  title,
  date,
  location,
  venue,
  link,
  logo,
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block cursor-pointer rounded-lg p-[2px] transition-all duration-300"
  >
    <div className="relative h-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex items-center justify-between gap-2">
        <div className="rounded-md border-2 border-black bg-white px-2 py-1 text-xs text-black">
          <span className="block max-w-[200px] truncate">{communityName}</span>
        </div>
        {logo && (
          <Image
            src={logo}
            alt={`${title} logo`}
            width={24}
            height={24}
            className="rounded-sm object-cover grayscale filter transition-all duration-300 hover:filter-none"
          />
        )}
      </div>
      <h3 className="mb-2 mt-3 text-xl font-medium text-black">{title}</h3>
      <div className="flex-row items-center text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="rounded bg-green-100 text-green-800 px-2 py-0.5 text-xs">
            {location}
          </span>
          <span className="rounded bg-lightgreen-100 text-lightgreen-800 px-2 py-0.5 text-xs">
            {date}
          </span>
          <AddToCalendar
            eventTitle={title}
            eventVenue={venue}
            eventDate={date}
            eventLink={link}
          />
        </div>
        <div className="mt-auto flex flex-grow flex-col justify-end">
          <span className="mt-4 flex items-start gap-1 text-xs">
            <MapPin size={16} className="mt-0.5 min-w-[16px]" />
            <span className="break-words">{venue}</span>
          </span>
        </div>
      </div>
    </div>
  </a>
);

const Events: React.FC = () => {
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterMonth, setFilterMonth] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<{ value: "asc" | "desc"; label: string }>({
    value: "asc",
    label: "Sort: Upcoming First",
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {

    setIsClient(true);
  }, []);

  const monthOptions = [
    { value: null, label: "None" },
    ...[...Array(12)].map((_, index) => ({
      value: index + 1,
      label: new Date(0, index).toLocaleString("default", { month: "long" }),
    })),
  ];

  const sortOptions: { value: "asc" | "desc"; label: string }[] = [
    { value: "asc", label: "Sort: Upcoming First" },
    { value: "desc", label: "Sort: Newest First" },
  ];

  const filteredEvents = events
    .filter((event: Event) => {
      const eventDate = new Date(event.eventDate);
      return (
        (filterLocation === "" ||
          event.location.toLowerCase().includes(filterLocation.toLowerCase())) &&
        (filterMonth === null || eventDate.getMonth() + 1 === filterMonth)
      );
    })
    .sort((a: Event, b: Event) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
    });

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "2px solid #28a745",
      boxShadow: "none",
      "&:hover": {
        border: "2px solid #1e7e34",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d4edda" : "#fff",
      color: state.isFocused ? "#155724" : "#000",
      "&:hover": {
        backgroundColor: "#d4edda",
        color: "#155724",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 999,
    }),
  };


  if (!isClient) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }


  return (
    <main className="mx-4 rounded-xl bg-white p-4 md:mx-8 lg:mx-16">
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        {/* Location Filter with Light Green Border */}
        <input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-2 border-2 border-[#28a745] rounded-md w-full md:w-1/2 focus:outline-none focus:border-[#1e7e34] transition-all"
        />

        {/* Month Filter */}
        <div className="md:w-1/3 w-full">
          <Select
            options={monthOptions}
            value={monthOptions.find((opt) => opt.value === filterMonth)}
            onChange={(option) => setFilterMonth(option?.value ?? null)}
            styles={customStyles}
            placeholder="Filter by Month"
            isClearable
          />
        </div>


        {/* Sort by Date */}
        <div className="md:w-1/3 w-full">
          <Select
            options={sortOptions}
            value={sortOptions.find((opt) => opt.value === sortOrder.value)}
            onChange={(option) => setSortOrder(option as { value: "asc" | "desc"; label: string })}
            styles={customStyles}
            placeholder="Sort by Date"
          />
        </div>
      </div>
      <section>
        <h2 className="mb-3 text-lg font-normal">
          <span className="text-[30px] font-semibold text-black">Filtered Events</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
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
            <EmptyEventCard message="No matching events found" />
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;
