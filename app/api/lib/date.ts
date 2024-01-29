/**
 * Converts a date string from "DD.MM.YYYY" format to a Unix timestamp in seconds.
 *
 * @param dateString The date string in "DD.MM.YYYY" format.
 * @returns The Unix timestamp representation of the given date, or null if input is invalid.
 */
export function convertDateToTimestamp(dateString: string): number | null {
  // Validate input
  if (!dateString) {
    console.error('Invalid date string provided');
    return null;
  }

  // Split the date string into components
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    console.error('Date string must be in YYYY.MM.DD format');
    return null;
  }

  // Destructure the date components and convert them to numbers
  const [year, month, day] = parts.map(Number);

  // Check for valid date components
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    console.error('Invalid date components');
    return null;
  }

  // Create a Date object in UTC
  const date = new Date(Date.UTC(year, month - 1, day));

  // Return the Unix timestamp in seconds
  return Math.floor(date.getTime() / 1000);
}

export function getStartAndEndDateFromRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.has('startDate')
    ? convertDateToTimestamp(searchParams.get('startDate') || '')
    : null;
  const endDate = searchParams.has('endDate')
    ? convertDateToTimestamp(searchParams.get('endDate') || '')
    : null;
  return { startDate, endDate };
}

export function convertEuropeanDateToISOFormat(
  inputDate: string | null,
): string {
  if (!inputDate) return '';
  const parts = inputDate.split('.');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return 'Invalid date format';
}
