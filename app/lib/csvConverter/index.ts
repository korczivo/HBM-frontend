import type { CsvRow } from '@/types/common';

export const convertCSVToJson = (csvData: string): CsvRow[] => {
  const lines = csvData.split('\n');
  const headers = lines[0].split(';');
  const result: CsvRow[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < lines.length; i++) {
    const obj: CsvRow = {};

    const currentLine = lines[i].split(';');

    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j]?.trim();
    }

    result.push(obj);
  }

  return result;
};
