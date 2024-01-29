import type { Metadata } from 'next';

import Calendar from '@/views/_boilerplate/Calender';

export const metadata: Metadata = {
  title: 'Calendar Page | Next.js E-commerce Dashboard Template',
  description: 'This is Calendar page for TailAdmin Next.js',
  // other metadata
};

const CalendarPage = () => {
  return <Calendar />;
};

export default CalendarPage;
