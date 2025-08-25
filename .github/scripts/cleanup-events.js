/**
 * Script to clean up past events from events.json
 * This script removes events with dates earlier than the current date
 */

import fs from 'fs';
import path from 'path';

// Path to events.json file
const eventsFilePath = path.join(process.cwd(), 'src', 'data', 'events.json');

// Read the events file
try {
  const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf8'));

  // Get today's date and reset to midnight for fair comparison
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  today.setHours(0, 0, 0, 0);

  console.log(`Starting cleanup: ${eventsData.length} total events`);

  // Filter out past events
  const currentEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.eventDate);
    // Keep events with today's date or future dates
    return eventDate >= today;
  });

  const removedCount = eventsData.length - currentEvents.length;
  console.log(`Removed ${removedCount} past events. Remaining: ${currentEvents.length}`);

  // Only write to file if events were actually removed
  if (removedCount > 0) {
    // Write the filtered data back to the file with proper formatting
    fs.writeFileSync(eventsFilePath, JSON.stringify(currentEvents, null, 2));
    console.log('File updated successfully');
  } else {
    console.log('No past events to remove');
  }
} catch (error) {
  console.error('Error processing events file:', error);
  process.exit(1);
}
