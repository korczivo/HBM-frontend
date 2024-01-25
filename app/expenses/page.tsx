'use client';

import React from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { CacheKeys } from '@/app/lib/api-client/cache';
import { getExpenses } from '@/app/lib/api-client/expenses';
import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';
import { Loader } from '@/views/common/Loader';
import type { DatePickerUseFormProps } from '@/views/DatePickerForm/DatePickerForm';
import { DatePickerForm } from '@/views/DatePickerForm/DatePickerForm';
import { ExpensesTable } from '@/views/ExpensesTable';
import { NoDataInfo } from '@/views/NoDataInfo/NoDataInfo';

// TODO: define metadata
// export const metadata = {
//   title: 'Expenses - HMB',
//   description: 'List of expenses',
// };

const Expenses = () => {
  const {
    data: expenses,
    error,
    mutate,
  } = useSWR(CacheKeys.GET_EXPENSES, () => getExpenses());

  if (error) {
    toast.error('Failed to load');
    return null;
  }
  if (!expenses) return <Loader />;

  const handleGetExpenses = async (period: DatePickerUseFormProps) => {
    const filteredExpenses = await getExpenses(period);
    await mutate(filteredExpenses, { revalidate: false });
  };

  return (
    <>
      <Breadcrumb pageName="Expenses" />
      <div className="mb-10 grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <DatePickerForm handleGetExpenses={handleGetExpenses} />
        </div>
      </div>
      {expenses.length ? (
        <ExpensesTable expenses={expenses} />
      ) : (
        <NoDataInfo title="No expenses." />
      )}
    </>
  );
};

export default Expenses;
