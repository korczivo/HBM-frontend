'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

// import { toast } from 'react-toastify';
// import { getCategorySpends } from '@/app/lib/api-client/analytics';
// import { getCurrentMonth } from '@/app/lib/helpers';
import { Loader } from '@/views/common/Loader';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface CategorySpendsChartState {
  series: number[];
  labels: string[];
  percentageOfTotal: string[];
}

interface ExpenseData {
  category: string;
  totalAmount: number;
  percentageOfTotal: string;
}

// interface CategorySpendsChartProps {
//   expenses: Array<ExpenseData>;
// }

function parseToExpensesState(data: ExpenseData[]): CategorySpendsChartState {
  const series = data?.map((item) => item.totalAmount);
  const labels = data?.map((item) => item.category);
  const percentageOfTotal = data?.map((item) => item.percentageOfTotal);

  return { series, labels, percentageOfTotal };
}

export const CategorySpendsChart = () => {
  // const { firstDay, lastDay } = getCurrentMonth();

  // TODO: add RQ
  const expenses: Array<ExpenseData> = [];

  const memorizedExpenses = useMemo<CategorySpendsChartState>(
    () => parseToExpensesState(expenses),
    [expenses],
  );

  // if (error) {
  //   toast.error('Failed to load');
  //   return null;
  // }
  if (!expenses) return <Loader />;

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#27f3f3',
    '#9966FF',
    '#FF9F40',
    '#f1d887',
    '#4D5360',
    '#09c7c6',
    '#C9CB3F',
    '#FF5ACD',
    '#20B2AA',
    '#778899',
    '#FFA07A',
    '#808080',
    '#8B0000',
    '#6495ED',
    '#DDA0DD',
    '#3CB371',
    '#B0C4DE',
    '#FFD700',
    '#D2B48C',
    '#A9A9A9',
  ];

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      events: {},
    },
    labels: memorizedExpenses.labels,
    legend: {
      show: true,
      position: 'top',
    },
    colors,
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 500,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  // const handleMonthChange = async (startDate: string, endDate: string) => {
  //   const filteredExpenses = await getCategorySpends({
  //     startDate,
  //     endDate,
  //   });
  // };

  return (
    <div className="rounded-sm border border-stroke px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark sm:px-7.5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Category spends
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            {/* <MonthSelect onMonthChange={handleMonthChange} /> */}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={memorizedExpenses.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center gap-y-3">
        {memorizedExpenses.labels.map((label, index) => (
          <div key={label} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"
                style={{ backgroundColor: colors[index] }}
              />
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {label} </span>
                <span> {memorizedExpenses.percentageOfTotal[index]} </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
