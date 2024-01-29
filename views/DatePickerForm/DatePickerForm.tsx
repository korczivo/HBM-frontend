'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

export interface DatePickerUseFormProps {
  startDate: string;
  endDate: string;
}

export const DatePickerForm = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DatePickerUseFormProps>();

  const onSubmit: SubmitHandler<DatePickerUseFormProps> = async (data) => {
    router.push(
      `${pathName}?startDate=${data.startDate}&endDate=${data.endDate}`,
    );
  };

  const onReset = () => {
    reset();
    router.push(pathName);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Select date range
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-5.5 p-6.5 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Controller
            name="startDate"
            control={control}
            defaultValue={startDate ?? ''}
            rules={{ required: 'Start date is required' }}
            render={({ field }) => (
              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="start-date"
              >
                Start date
                <div className="relative">
                  <input
                    type="date"
                    id="start-date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...field}
                  />
                  {errors.startDate && (
                    <span className="text-danger">
                      {errors.startDate.message}
                    </span>
                  )}
                  {startDate ? (
                    <button
                      type="button"
                      className="absolute right-12 top-4 z-1"
                      onClick={() => onReset()}
                    >
                      <img src="/images/icon/close.svg" alt="close" />
                    </button>
                  ) : null}
                </div>
              </label>
            )}
          />
        </div>
        <div className="flex flex-col gap-9">
          <Controller
            name="endDate"
            control={control}
            defaultValue={endDate ?? ''}
            rules={{ required: 'End date is required' }}
            render={({ field }) => (
              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="end-date"
              >
                End date
                <div className="relative">
                  <input
                    type="date"
                    id="end-date"
                    className="custom-input-date custom-input-date-1 dark-bg-form-input w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary"
                    {...field}
                  />
                  {errors.endDate && (
                    <span className="text-danger">
                      {errors.endDate.message}
                    </span>
                  )}
                  {startDate ? (
                    <button
                      type="button"
                      className="absolute right-12 top-4 z-1"
                      onClick={() => onReset()}
                    >
                      <img src="/images/icon/close.svg" alt="close" />
                    </button>
                  ) : null}
                </div>
              </label>
            )}
          />
        </div>
        <div className="col-end-2 flex gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-primary/20 disabled:border-graydark disabled:bg-whiter disabled:text-graydark lg:px-8 xl:px-10"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
