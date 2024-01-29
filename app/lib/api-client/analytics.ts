import { convertObjectToQueryString } from '@/app/lib/helpers';
import type {
  DatePickerForm,
  DatePickerUseFormProps,
} from '@/views/DatePickerForm/DatePickerForm';

export const getCategorySpends = async (params?: DatePickerUseFormProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/category-spends${params ? `?${convertObjectToQueryString(params as keyof typeof DatePickerForm)}` : ''}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
