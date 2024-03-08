import { initializeDatabase } from '@/app/api/lib/database';

export async function POST(req: Request) {
  const db = await initializeDatabase();
  const salary = await req.json();

  await db.exec('BEGIN TRANSACTION');

  try {
    const { month, year, salaryAmount } = salary;
    await db.run(
      'INSERT INTO salary (month, year, salaryAmount) VALUES (?, ?, ?)',
      [month, year, salaryAmount],
    );

    await db.exec('COMMIT');

    return new Response(
      JSON.stringify({ message: 'Salary added successfully' }),
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
