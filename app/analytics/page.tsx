import { QueryClient } from '@tanstack/query-core';
import React from 'react';

import { getCategorySpends } from '@/app/lib/api-client/analytics';
import { CACHE_TIMES, CacheKeys } from '@/app/lib/cache';
import { formatDateToDDMMYYYY, getCurrentMonth } from '@/app/lib/helpers';
import { CategorySpendsChart } from '@/views/CategorySpendsChart/CategorySpendsChart';


export const metadata = {
  title: 'Expenses Analytics - HMB',
  description: 'Charts of expenses',
};

const Analytics = async () => {
  const queryClient = new QueryClient();
  const { firstDayOfCurrentMonth, lastDayOfCurrentMonth } = getCurrentMonth();
  const currentMonth = {
    startDate: formatDateToDDMMYYYY(firstDayOfCurrentMonth),
    endDate: formatDateToDDMMYYYY(lastDayOfCurrentMonth),
  };

  await queryClient.prefetchQuery({
    queryKey: [CacheKeys.GET_ANALYTICS_CATEGORY_SPENDS, currentMonth],
    queryFn: () => getCategorySpends(currentMonth),
    staleTime: CACHE_TIMES['5m'],
  });
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-9">
      {/* <div className="col-span-2"> */}
      {/*  <RevenueChart /> */}
      {/* </div> */}
      <div className="row-start-1 bg-white dark:bg-boxdark">
        <CategorySpendsChart />
      </div>
    </div>
  );
};

export default Analytics;
