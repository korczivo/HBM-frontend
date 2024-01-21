import type { Metadata } from 'next';

import { AddExpenseForm } from '@/components/AddExpenseForm';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
  title: 'Add expense - HMB',
  description: 'Add expense',
};

const AddExpanses = () => {
  return (
    <>
      <Breadcrumb pageName="Add new expense" />

      <AddExpenseForm />
    </>
  );
};

export default AddExpanses;
