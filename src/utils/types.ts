export type Expense = {
  postingDate: string;
  recipient: string;
  operationAmount: string;
  category: string;
  id: string;
};

export interface CsvRow {
  [key: string]: string;
}