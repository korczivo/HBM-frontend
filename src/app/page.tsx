import { SpendList } from '@/features/SpendList/components/SpendList';
import { Main } from '@/templates/Main';
import type { Expense } from '@/utils/types';

async function getExpenses(): Promise<Array<Expense>> {
  const res = await fetch('http://localhost:3000/api/expense');
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json();
}

export default async function Home() {
  const expenses = await getExpenses();

  return (
    <Main>
      <SpendList expensesList={expenses} />
    </Main>
  );
}
