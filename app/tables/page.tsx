import type { Metadata } from 'next';

import TableOne from '@/views/_boilerplate/Tables/TableOne';
import TableThree from '@/views/_boilerplate/Tables/TableThree';
import TableTwo from '@/views/_boilerplate/Tables/TableTwo';
import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';

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
