'use client';

import { ErrorMessage } from '@hookform/error-message';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { createExpenses } from '@/app/lib/api-client/expenses';
import { CacheKeys } from '@/app/lib/cache';
import { convertCSVToJson } from '@/app/lib/csvConverter';
import type { Expense } from '@/types/expense';
import { SpendCategory } from '@/types/expense';
import { ExpensesTable } from '@/views/ExpensesTable';

type FormProps = {
  csvFile: File;
};
export const AddExpenseForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  const [noCategoryExpenses, setNoCategoryExpenses] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormProps>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const csvData = e.target?.result as string;
      const jsonData = convertCSVToJson(csvData);
      const mapNewStructure = jsonData.map((item) => ({
        postingDate: item['Data księgowania'] ?? '',
        recipient: item['Nadawca / Odbiorca'] ?? '',
        operationAmount: item['Kwota operacji'] ?? '',
        category: item.Kategoria ?? '',
        id: item['Numer referencyjny'] ?? '',
      }));
      setExpenses(mapNewStructure);
      clearErrors();
    };

    reader.readAsText(file);
  };

  const handleUpdateExpense = (expenseId: string, newCategory: string) => {
    setExpenses((currentExpenses) => {
      const updatedExpenses = currentExpenses.map((expense) => {
        if (expense.id === expenseId) {
          return { ...expense, category: newCategory };
        }
        return expense;
      });
      return updatedExpenses;
    });
  };

  const onSubmit = async () => {
    setIsFormLoading(true);
    try {
      const response = await createExpenses(expenses);
      if (response) {
        await queryClient.invalidateQueries({ queryKey: [CacheKeys.GET_EXPENSES] });
        router.push('/expenses');
        toast.success('Expenses saved successfully.');
      }
    } catch (error) {
      toast.error('An error occurred while saving expenses.');
    } finally {
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    const hasSomeUncategorizedExpenses = expenses.some(
      (expense) => expense.category === SpendCategory.Uncategorized,
    );

    if (hasSomeUncategorizedExpenses) {
      setNoCategoryExpenses(true);
    } else {
      setNoCategoryExpenses(false);
    }
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Upload CSV file
            </h3>
          </div>

          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label
                  className="mb-3 block text-black dark:text-white"
                  htmlFor="attachFile"
                >
                  Attach file
                  <input
                    type="file"
                    id="attachFile"
                    {...register('csvFile', {
                      required: 'Please upload file.',
                    })}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  <div className="text-danger">
                    <ErrorMessage errors={errors} name="csvFile" />
                  </div>
                </label>

                {noCategoryExpenses ? (
                  <div className="mb-4">
                    <span className="text-danger">Select categories</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={noCategoryExpenses || isFormLoading}
                  className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-primary/20 disabled:border-graydark disabled:bg-whiter disabled:text-graydark lg:px-8 xl:px-10"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {expenses.length ? (
        <ExpensesTable
          handleUpdateExpense={handleUpdateExpense}
          expenses={expenses}
        />
      ) : null}
    </div>
  );
};
