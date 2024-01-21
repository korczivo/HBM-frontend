'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import { convertCSVToJson } from '@/app/lib/csvConverter';
import type { Expense } from '@/types/expense';
import { ExpensesTable } from '@/views/ExpensesTable';

export const AddExpenseForm = () => {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

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

  const handleSave = async () => {
    await fetch('/api/expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenses),
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    fetch('/api/expense')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
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
              <form>
                <label
                  className="mb-3 block text-black dark:text-white"
                  htmlFor="attachFile"
                >
                  Attach file
                  <input
                    type="file"
                    id="attachFile"
                    onChange={handleInputChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </label>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ExpensesTable />
    </div>
  );
};
