import { format } from "date-fns"
import fs from "fs"
import path from "path"
import events from "../src/data/events.json" with { type: "json" }

export const createRSSFeed = (events) => {
  const feedItems = events.map(event => {
    try {
    const eventDate = new Date(`${event.eventDate}T${event.eventTime}:00`);
    console.log({eventDate})
    const formattedDate = format(eventDate, 'EEE, dd MMM yyyy HH:mm:ss OOOO');

    if(isNaN(eventDate)){
      console.log("it not a number")
      return null
    }
    
    return `
      <item>
        <title>${event.eventName}</title>
        <link>${event.eventLink}</link>
        <description>${event.eventDescription}</description>
        <pubDate>${formattedDate}</pubDate>
        <guid>${event.eventLink}</guid>
        <category>${event.location}</category>
        <author>${event.communityName}</author>
        <enclosure url="${event.communityLogo}" type="image/jpeg"/>
      </item>
    `;
      
    } catch (error) {
      console.error(`Failed to process event: ${event.eventName}`, error);
      return null;
    }
  })
  .filter(Boolean)
  .join('');

  const rssFeed = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Upcoming Events</title>
        <link>https://tamilnadu.tech/</link>
        <description>Upcoming events for the community</description>
        <language>en-us</language>
        ${feedItems}
      </channel>
    </rss>
  `;

  return rssFeed;
};

const writeRssfile = () => {
  const outputPath = path.join('public', 'rss.xml');
  const rssFeed = createRSSFeed(events);

  fs.writeFileSync(outputPath, rssFeed, 'utf-8');
  console.log('RSS feed generated successfully at:', outputPath);
};

writeRssfile()
