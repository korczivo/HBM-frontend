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
  currentMonthName: string;
  firstDayOfCurrentMonth: string;
  lastDayOfCurrentMonth: string;
} {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth() + 1;
  const currentMonth = String(currentMonthNumber).padStart(2, '0');
  const firstDayOfCurrentMonth = `${currentYear}-${currentMonth}-01`;

  // To get the last day of the current month, you can set the date to 0 for the next month
  const lastDayDate = new Date(currentYear, currentMonthNumber, 0);
  const lastDayOfCurrentMonth = `${currentYear}-${currentMonth}-${String(lastDayDate.getDate()).padStart(2, '0')}`;

  // Array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get current month name
  const currentMonthName = monthNames[currentMonthNumber - 1];

  return {
    currentYear,
    currentMonth,
    currentMonthName,
    firstDayOfCurrentMonth,
    lastDayOfCurrentMonth,
  };
}

export function generateMonthMap(): Map<
  string,
  { startDate: string; endDate: string }
> {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthMap = new Map<string, { startDate: string; endDate: string }>();

  // eslint-disable-next-line no-plusplus
  for (let month = 0; month < 12; month++) {
    const currentMonthNumber = String(month + 1).padStart(2, '0');
    const firstDayOfMonth = `${getCurrentMonth().currentYear}-${currentMonthNumber}-01`;
    const lastDayOfMonthDate = new Date(
      getCurrentMonth().currentYear,
      month + 1,
      0,
    );
    const lastDayOfMonth = `${getCurrentMonth().currentYear}-${currentMonthNumber}-${String(lastDayOfMonthDate.getDate()).padStart(2, '0')}`;

    monthMap.set(monthNames[month], {
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    });
  }

  return monthMap;
}
export function formatDateToDDMMYYYY(inputDateString: string): string {
  const dateObject = new Date(inputDateString);

  const year = dateObject.getFullYear();
  let day = dateObject.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;
  let month = (1 + dateObject.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  return `${day}-${month}-${year}`;
}
