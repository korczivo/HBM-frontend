import type { NextRequest } from 'next/server';

import {
  convertDateToTimestamp,
  convertEuropeanDateToISOFormat,
  getStartAndEndDateFromRequest,
} from '@/app/api/lib/date';

import { initializeDatabase } from '../lib/database';

export async function GET(request: NextRequest): Promise<Response> {
  const db = await initializeDatabase();
  const { startDate, endDate } = getStartAndEndDateFromRequest(request);

  let query = 'SELECT * FROM expenses';
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

  const expenses = await db.all(query, ...params);

  return new Response(JSON.stringify(expenses), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(req: Request) {
  const db = await initializeDatabase();
  const expenses = await req.json();

  await db.exec('BEGIN TRANSACTION');

  try {
    for (const expense of expenses) {
      const { postingDate, recipient, category } = expense;
      let { operationAmount } = expense;

      operationAmount = Math.abs(parseFloat(operationAmount.replace(',', '.')));

      // eslint-disable-next-line no-await-in-loop
      await db.run(
        'INSERT INTO expenses (postingDate, recipient, operationAmount, category) VALUES (?, ?, ?, ?)',
        [
          convertDateToTimestamp(convertEuropeanDateToISOFormat(postingDate)),
          recipient,
          operationAmount,
          category,
        ],
      );
    }

    await db.exec('COMMIT');

    return new Response(
      JSON.stringify({ message: 'Expenses added successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    await db.exec('ROLLBACK');

    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
