import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'makerstribe.in'
      },
      {
        protocol: 'https',
        hostname: 'geekcoders-community.pages.dev'
      },
      {
        protocol: 'https',
        hostname: 'globalazure.in'
      },
      {
        protocol: 'https',
        hostname: 'secure.meetupstatic.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ]
  }
};

export default config;
