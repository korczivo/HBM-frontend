import type { Expense } from '@/utils/types';

export type SpendListProps = {
  expensesList?: Array<Expense>;
  isEditable?: boolean;
};
