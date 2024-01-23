// TODO: make research why data is visible only after hard refresh
import type { Metadata } from 'next';

import { getExpenses } from '@/app/lib/api-client/expenses';
import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';
import { ExpensesTable } from '@/views/ExpensesTable';

export const metadata: Metadata = {
  title: 'Expenses - HMB',
  description: 'List of expenses',
};

const Expenses = async () => {
  const expenses = await getExpenses();
  return (
    <>
      <Breadcrumb pageName="Expesnses" />
      <ExpensesTable expenses={expenses} />
    </>
  );
};

export default Expenses;
