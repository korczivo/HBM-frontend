/**
 * Converts a date string from "DD.MM.YYYY" format to a Unix timestamp in seconds.
 *
 * @param dateString The date string in "DD.MM.YYYY" or "DD-MM-YYYY" (depends on separator) format.
 * @param separator
 * @returns The Unix timestamp representation of the given date, or null if input is invalid.
 */
export function convertEuropeanDateStringToTimestamp(
  dateString: string,
  separator: '-' | '.' = '-',
): number | null {
  if (!dateString) {
    console.error('Invalid date string provided');
    return null;
  }

  // Split the date string into components
  const parts = dateString.split(separator);
  if (parts.length !== 3) {
    console.error('Date string must be in DD-MM-YYYY format');
    return null;
  }

  // Destructure the date components and convert them to numbers
  const [day, month, year] = parts.map(Number);

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

/**
 * Converts a Unix timestamp in seconds to a date string in "DD.MM.YYYY" format.
 *
 * @param {number} timestamp - The Unix timestamp in seconds.
 * @returns {string|null} - The date string representation of the given timestamp, or null if input is invalid.
 */
export function convertTimestampToEuropeanDateString(
  timestamp: number,
): string | null {
  if (Number.isNaN(timestamp)) {
    console.error('Invalid timestamp provided');
    return null;
  }

  const date = new Date(timestamp * 1000);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${day}.${month}.${year}`;
}
