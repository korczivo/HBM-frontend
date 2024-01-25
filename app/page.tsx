import type { Metadata } from 'next';

import ECommerce from '@/views/Dashboard/E-commerce';

export const metadata: Metadata = {
  title: 'TailAdmin | Next.js E-commerce Dashboard Template',
  description: 'This is Home Blog page for TailAdmin Next.js',
  // other metadata
};

export default function Home() {
  return <ECommerce />;
}
