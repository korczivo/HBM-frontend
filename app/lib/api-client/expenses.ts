import type { Expense } from '@/types/expense';

export const createExpenses = async (expenses: Array<Expense>) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/expense`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenses),
  });

  if (!response.ok) {
    throw new Error('Failed to save expenses.');
  }

  return response.json();
};

export const getExpenses = async (): Promise<Array<Expense>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/expense`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const expenses = await response.json();
    return expenses as Array<Expense>;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    // Depending on how you want to handle errors, you might want to rethrow the error or return a default value
    throw error; // Rethrow if you want the error to propagate
    // return []; // Return an empty array or some default value if you want to handle the error gracefully
  }
};
