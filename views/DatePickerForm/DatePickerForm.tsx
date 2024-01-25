'use client';

import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

export interface DatePickerUseFormProps {
  startDate: string;
  endDate: string;
}
interface DatePickerFormProps {
  handleGetExpenses: (arg: DatePickerUseFormProps) => void;
}

export const DatePickerForm = ({ handleGetExpenses }: DatePickerFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DatePickerUseFormProps>();

  const onSubmit: SubmitHandler<DatePickerUseFormProps> = (data) => {
    handleGetExpenses(data);
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
          <label
            className="mb-3 block text-black dark:text-white"
            htmlFor="start-date"
          >
            Start date
            <div className="relative">
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                rules={{ required: 'Start date is required' }}
                render={({ field }) => (
                  <>
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
                  </>
                )}
              />
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-9">
          <label
            className="mb-3 block text-black dark:text-white"
            htmlFor="end-date"
          >
            End date
            <div className="relative">
              <Controller
                name="endDate"
                control={control}
                defaultValue=""
                rules={{ required: 'End date is required' }}
                render={({ field }) => (
                  <>
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
                  </>
                )}
              />
            </div>
          </label>
        </div>
        <div className="col-end-2">
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
