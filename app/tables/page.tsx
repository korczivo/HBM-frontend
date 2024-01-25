import type { Metadata } from 'next';

import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';
import TableOne from '@/views/Tables/TableOne';
import TableThree from '@/views/Tables/TableThree';
import TableTwo from '@/views/Tables/TableTwo';

export const metadata: Metadata = {
  title: 'Tables Page | Next.js E-commerce Dashboard Template',
  description: 'This is Tables page for TailAdmin Next.js',
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default TablesPage;
