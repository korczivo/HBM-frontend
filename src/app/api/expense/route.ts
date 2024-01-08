import type { NextApiRequest } from 'next';

import { initializeDatabase } from '@/lib/database';

export async function GET() {
  const db = await initializeDatabase();
  const expenses = await db.all('SELECT * FROM expenses');

  return new Response(JSON.stringify(expenses), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(req: NextApiRequest) {
  const db = await initializeDatabase();
  const expenses = await req.json(); // Expecting an array of Expense objects

  // Start a transaction to ensure all inserts are processed together
  await db.exec('BEGIN TRANSACTION');

  try {
    for (const expense of expenses) {
      const { postingDate, recipient, operationAmount, category } = expense;

      await db.run(
        'INSERT INTO expenses (postingDate, recipient, operationAmount, category) VALUES (?, ?, ?, ?)',
        [postingDate, recipient, operationAmount, category],
      );
    }

    // Commit the transaction after successfully inserting all expenses
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
    // Rollback the transaction in case of an error
    await db.exec('ROLLBACK');

    // Return an error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
