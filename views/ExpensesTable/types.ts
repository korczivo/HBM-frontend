import type { Expense } from '@/types/expense';

export type ExpensesTableProps = {
  expenses?: Array<Expense>;
  handleUpdateExpense?: (arg1: string, arg2: string) => void;
};
