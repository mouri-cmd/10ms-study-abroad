import React from 'react';
import { fetchSheet } from '@/lib/fetchSheetData';
import HomeClient from './HomeClient';

export const metadata = {
  title: '10 Minute School | Study Abroad',
  description: 'From aspirations to admissions, trusted study abroad guidance from 10 Minute School',
};

export default async function Page() {
  // Fetch Destinations and Testimonials from Google Sheet
  const destinationsRaw = await fetchSheet("Destinations");
  const testimonialsRaw = await fetchSheet("Testimonials");

  // Nest testimonials inside destinations by matching country_id to id/slug
  const destinations = destinationsRaw.map((dest: any) => {
    const destTests = testimonialsRaw.filter((t: any) => 
      t.country_id?.toLowerCase() === dest.id?.toLowerCase() || 
      t.country_id?.toLowerCase() === dest.slug?.toLowerCase()
    );
    return {
      ...dest,
      testimonials: destTests
    };
  });

  return <HomeClient destinations={destinations} />;
}
