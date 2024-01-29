import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import React from 'react';

import { getExpenses } from '@/app/lib/api-client/expenses';
import { CACHE_TIMES, CacheKeys } from '@/app/lib/cache';
import Breadcrumb from '@/views/Breadcrumbs/Breadcrumb';
import { DatePickerForm } from '@/views/DatePickerForm/DatePickerForm';
import { ExpensesTable } from '@/views/ExpensesTable';

export const metadata = {
  title: 'Expenses - HMB',
  description: 'List of expenses',
};

const Expenses = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.GET_EXPENSES],
    queryFn: () => getExpenses(),
    staleTime: CACHE_TIMES['5m'],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Breadcrumb pageName="Expenses" />
      <div className="mb-10 grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <DatePickerForm />
        </div>
      </div>
      <ExpensesTable />
    </HydrationBoundary>
  );
};

export default Expenses;
