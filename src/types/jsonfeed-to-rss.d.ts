declare module 'jsonfeed-to-rss' {
  interface JsonFeed {
    version: string;
    title: string;
    home_page_url?: string;
    feed_url?: string;
    description?: string;
    items: Array<{
      id: string;
      url: string;
      title: string;
      content_html?: string;
      date_published?: string;
      date_modified?: string;
      authors?: Array<{ name: string }>;
      tags?: string[];
      image?: string;
    }>;
  }

  function jsonfeedToRss(jsonFeed: JsonFeed): string;
  export default jsonfeedToRss;
}
