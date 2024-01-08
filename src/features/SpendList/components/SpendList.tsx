'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import { CategorySelect } from '@/features/SpendList/components/CategorySelect';
import type { SpendListProps } from '@/features/SpendList/interfaces';
import { UploadForm } from '@/features/UploadForm/components/UploadForm';
import { convertCSVToJson } from '@/utils/helpers';
import type { Expense } from '@/utils/types';

export const SpendList = ({
  expensesList = [],
  isEditable = false,
}: SpendListProps) => {
  const [expenses, setExpenses] = useState<Array<Expense>>(expensesList);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <>
      {isEditable ? <UploadForm handleInputChange={handleInputChange} /> : null}

      <table className="text-sm text-base-100">
        <thead>
          <tr>
            <th>Data księgowania</th>
            <th>Nadawca / Odbiorca</th>
            <th>Kwota operacji</th>
            <th>Kategoria</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={item.id} className="border-b-2 p-2">
              <td>{item.postingDate}</td>
              <td>{item.recipient}</td>
              <td>{item.operationAmount}</td>
              <td>
                {isEditable ? (
                  <CategorySelect
                    value={item.category}
                    expenseId={item.id}
                    handleSelectChange={handleUpdateExpense}
                  />
                ) : (
                  item.category
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditable ? (
        <button type="button" className="mt-6" onClick={() => handleSave()}>
          Save
        </button>
      ) : null}
    </>
  );
};
