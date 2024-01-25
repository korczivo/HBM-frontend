export function convertObjectToQueryString(
  obj: Record<string, string | number>,
): string {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

export function formatDate(inputDate: string | null): string {
  if (!inputDate) return '';
  const parts = inputDate.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
  }
  return 'Invalid date format';
}
