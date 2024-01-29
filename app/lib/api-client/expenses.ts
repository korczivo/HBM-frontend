import { convertObjectToQueryString } from '@/app/lib/helpers';
import type { Expense } from '@/types/expense';
import type {
  DatePickerForm,
  DatePickerUseFormProps,
} from '@/views/DatePickerForm/DatePickerForm';

export const createExpenses = async (expenses: Array<Expense>) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/expense`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenses),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to save expenses.');
  }

  return response.json();
};

export const getExpenses = async (params?: DatePickerUseFormProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/expense${params ? `?${convertObjectToQueryString(params as keyof typeof DatePickerForm)}` : ''}`,
  );

  const expenses = (await response.json()) as Expense[];
  return expenses;
};
