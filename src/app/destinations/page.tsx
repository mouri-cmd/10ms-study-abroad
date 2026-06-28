import React from 'react';
import { fetchSheet } from '@/lib/fetchSheetData';
import DestinationsClient from './DestinationsClient';

export const metadata = {
  title: 'Study Abroad Destinations | 10 Minute School Study Abroad',
  description: 'Compare countries by tuition, living costs, scholarships, and career opportunities.',
};

export default async function Page() {
  const destinations = await fetchSheet("Destinations");
  return <DestinationsClient destinations={destinations} />;
}
