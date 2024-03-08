import type { Metadata } from 'next';

import { AddSalaryForm } from '@/views/AddSalaryForm';
import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
  title: 'Add salary - HMB',
  description: 'Add salary',
};

const AddExpanses = () => {
  return (
    <>
      <Breadcrumb pageName="Add salary" />
      <AddSalaryForm />
    </>
  );
};

export default AddExpanses;
