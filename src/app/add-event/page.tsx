import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'This page has been removed.'
};

export default function AddEventPage() {
  notFound();
  return null;
}
