import React from 'react';

import { CategorySpendsChart } from '@/views/CategorySpendsChart/CategorySpendsChart';
import { RevenueChart } from '@/views/RevenueChart/RevenueChart';

const Analytics = async () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-9">
      <div className="col-span-2">
        <RevenueChart />
      </div>
      <div className="row-start-2 bg-white dark:bg-boxdark">
        <CategorySpendsChart />
      </div>

      {/* <div className="row-start-2 bg-white dark:bg-boxdark"> */}
      {/*  {!expenses.length ? ( */}
      {/*    <CategorySpendsChart expenses={expenses} /> */}
      {/*  ) : ( */}
      {/*    <NoDataInfo title="No data." /> */}
      {/*  )} */}
      {/* </div> */}
    </div>
  );
};

export default Analytics;
