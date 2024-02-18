import { roundToNearestHalf } from '@/app/api/lib/helpers';
import { getStartAndEndDateFromRequest } from '@/app/api/lib/requestHelpers';

import { initializeDatabase } from '../../lib/database';

export async function GET(request: Request): Promise<Response> {
  const db = await initializeDatabase();

  const { startDate, endDate } = getStartAndEndDateFromRequest(request);

  let query =
    "SELECT category, SUM(CAST(REPLACE(operationAmount, ',', '.') AS REAL)) AS totalAmount FROM expenses";

  const params = [];

  if (startDate && endDate) {
    query += ' WHERE postingDate >= ? AND postingDate <= ?';
    params.push(startDate, endDate);
  } else if (startDate) {
    query += ' WHERE postingDate >= ?';
    params.push(startDate);
  } else if (endDate) {
    query += ' WHERE postingDate <= ?';
    params.push(endDate);
  }

  query += ' GROUP BY category';

  const expenses = await db.all(query, ...params);

  const totalSum = expenses.reduce((acc, curr) => acc + curr.totalAmount, 0);

  const expensesWithPercentage = expenses.map((expense) => ({
    ...expense,
    percentageOfTotal: `${roundToNearestHalf(
      (expense.totalAmount / totalSum) * 100,
    ).toFixed(1)}%`,
  }));

  return new Response(JSON.stringify(expensesWithPercentage), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
