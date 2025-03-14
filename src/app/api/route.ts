import { NextResponse } from 'next/server';

// This is for checking the site's aliveness access by some external apps

export async function GET() {
  return NextResponse.json({
    message: 'pong'
  });
}
