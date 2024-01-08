import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function openDb() {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
}

export async function initializeDatabase() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      postingDate TEXT,
      recipient TEXT,
      operationAmount TEXT,
      category TEXT
    )
  `);
  return db;
}
