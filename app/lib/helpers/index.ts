export function convertObjectToQueryString(
  obj: Record<string, string | number>,
): string {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

export function getCurrentMonth(): {
  currentYear: number;
  currentMonth: string;
  firstDay: string;
  lastDay: string;
} {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const firstDay = `${currentYear}-${currentMonth}-01`;

  // To get the last day of the current month, you can set the date to 0 for the next month
  const lastDayDate = new Date(currentYear, currentDate.getMonth() + 1, 0);
  const lastDay = `${currentYear}-${currentMonth}-${String(lastDayDate.getDate()).padStart(2, '0')}`;

  return {
    currentYear,
    currentMonth,
    firstDay,
    lastDay,
  };
}
