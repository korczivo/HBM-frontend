import { convertEuropeanDateStringToTimestamp } from '@/app/api/lib/date';

export function getStartAndEndDateFromRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.has('startDate')
    ? convertEuropeanDateStringToTimestamp(
        searchParams.get('startDate') ?? '',
        '-',
      )
    : null;
  const endDate = searchParams.has('endDate')
    ? convertEuropeanDateStringToTimestamp(
        searchParams.get('endDate') ?? '',
        '-',
      )
    : null;

  return { startDate, endDate };
}
