import type { Metadata } from 'next';

import { AddExpenseForm } from '@/views/AddExpenseForm';
import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
  title: 'Add expenses - HMB',
  description: 'Add expense',
};

const AddExpanses = () => {
  return (
    <>
      <Breadcrumb pageName="Add expenses" />

      <AddExpenseForm />
    </>
  );
};

export default AddExpanses;
