import type { Salary } from '@/views/AddSalaryForm/types';

export const createSalary = async (salary: Salary) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/salary`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(salary),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to save salary.');
  }

  return response.json();
};
