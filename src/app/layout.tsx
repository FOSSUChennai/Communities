import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tamilnadu Tech Events & Developer Conferences at One Place | TN Tech Community",
  description: "Never miss an event from your favourite Tech Commnuity in Tamil Nadu. Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu. Stay updated with the latest technology events, workshops, and hackathons in Chennai, Coimbatore, Madurai and more.",
  keywords: "tamil nadu tech events, developer conferences tamil nadu, tech meetups chennai, developer events chennai, tamil nadu developer community, tech conferences india, technology events chennai, developer workshops tamil nadu, tech community events, coding meetups chennai",
  openGraph: {
    title: "Tamil Nadu Tech Events & Developer Conferences | TN Tech Community",
    description: "Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu. Stay updated with the latest technology events, workshops, and hackathons.",
    type: "website",
    locale: "en_US",
    siteName: "Tamil Nadu Tech Events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamil Nadu Tech Events & Developer Conferences",
    description: "Discover upcoming developer conferences, tech meetups, and community events across Tamil Nadu.",
  },
  alternates: {
    canonical: "https://tamilnadu.tech/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
