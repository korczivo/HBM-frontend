'use client';

import { useQuery } from '@tanstack/react-query';
import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { type ChangeEvent, useState } from 'react';

import { getRevenue } from '@/app/lib/api-client/analytics';
import { CACHE_TIMES, CacheKeys } from '@/app/lib/cache';
import { generateYearMap, getCurrentMonth } from '@/app/lib/helpers';
import { EntrySelect } from '@/views/MonthSelect/EntrySelect';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    // events: {
    //   beforeMount: (chart) => {
    //     chart.windowResizeHandler();
    //   },
    // },
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 550,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 550,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 30000,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

export const RevenueChart = () => {
  const { currentYear } = getCurrentMonth();
  const yearsMap = generateYearMap();
  const yearsEntries = Array.from(yearsMap.entries());
  const [selectedYearRevenue, setSelectedYearRevenue] =
    useState(currentYear.toString());

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYearRevenue(e.target.value);
  };

  const { data: expenses } = useQuery({
    queryKey: [CacheKeys.GET_ANALYTICS_REVENUE, selectedYearRevenue],
    queryFn: () => getRevenue(selectedYearRevenue),
    staleTime: CACHE_TIMES['5m'],
    refetchInterval: false,
  });

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Salary',
        data: [18000, 18000, 18000, 0, 0, 0, 0, 0, 0, 0, 0],
      },

      {
        name: 'Expenses',
        data: [9452, 10521, 8500, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  // const handleReset = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //   }));
  // };
  //
  // handleReset;

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== 'undefined';

  if (!isWindowAvailable()) return null;

  console.log(expenses);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 xl:min-h-[550px]">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary" />
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary" />
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <EntrySelect
              onEntryChange={handleMonthChange}
              selectedEntry={selectedYearRevenue}
              entries={yearsEntries}
            />
          </div>
        </div>
      </div>

      <ReactApexChart
        options={options}
        series={state.series}
        type="area"
        width="100%"
        height="100%"
      />
    </div>
  );
};
