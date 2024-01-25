import { initializeDatabase } from '@/app/lib/database';
import { formatDate } from '@/app/lib/helpers';

export async function GET(request: Request): Promise<Response> {
  const db = await initializeDatabase();
  const { searchParams } = new URL(request.url);

  const startDate = searchParams.has('startDate')
    ? formatDate(searchParams.get('startDate'))
    : null;

  const endDate = searchParams.has('endDate')
    ? formatDate(searchParams.get('endDate'))
    : null;

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
      const { postingDate, recipient, operationAmount, category } = expense;

      await db.run(
        'INSERT INTO expenses (postingDate, recipient, operationAmount, category) VALUES (?, ?, ?, ?)',
        [postingDate, recipient, operationAmount, category],
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
