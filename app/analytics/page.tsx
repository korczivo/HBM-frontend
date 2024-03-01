import { QueryClient } from '@tanstack/query-core';
import React from 'react';

import { getCategorySpends, getRevenue } from '@/app/lib/api-client/analytics';
import { CACHE_TIMES, CacheKeys } from '@/app/lib/cache';
import { formatDateToDDMMYYYY, getCurrentMonth } from '@/app/lib/helpers';
import { CategorySpendsChart } from '@/views/CategorySpendsChart/CategorySpendsChart';
import { RevenueChart } from '@/views/RevenueChart/RevenueChart';

export const metadata = {
  title: 'Expenses Analytics - HMB',
  description: 'Charts of expenses',
};

const Analytics = async () => {
  const queryClient = new QueryClient();
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth, currentYear } =
    getCurrentMonth();
  const currentMonth = {
    startDate: formatDateToDDMMYYYY(firstDayOfCurrentMonth),
    endDate: formatDateToDDMMYYYY(lastDayOfCurrentMonth),
  };
  const currentYearObj = {
    startDate: `01-01-${currentYear}`,
    endDate: `31-12-${currentYear}`,
  };

  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.GET_ANALYTICS_CATEGORY_SPENDS, currentMonth],
    queryFn: () => getCategorySpends(currentMonth),
    staleTime: CACHE_TIMES['5m'],
  });
  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.GET_ANALYTICS_REVENUE, currentYearObj],
    queryFn: () => getRevenue(currentYearObj),
    staleTime: CACHE_TIMES['5m'],
  });

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-9">
      <div className="col-span-2">
        <RevenueChart />
      </div>
      <div className="row-start-1 bg-white dark:bg-boxdark">
        <CategorySpendsChart />
      </div>
    </div>
  );
};

export default Analytics;
