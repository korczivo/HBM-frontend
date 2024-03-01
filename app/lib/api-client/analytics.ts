import { convertObjectToQueryString } from '@/app/lib/helpers';
import { getErrorResponse } from '@/app/lib/helpers/response';
import type {
  DatePickerForm,
  DatePickerUseFormProps,
} from '@/views/DatePickerForm/DatePickerForm';

export const getCategorySpends = async (params?: DatePickerUseFormProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/category-spends${params ? `?${convertObjectToQueryString(params as keyof typeof DatePickerForm)}` : ''}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (e) {
    throw new Error(await getErrorResponse(e as Error));
  }
};

export const getRevenue = async (params?: DatePickerUseFormProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/revenue${params ? `?${convertObjectToQueryString(params as keyof typeof DatePickerForm)}` : ''}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (e) {
    throw new Error(await getErrorResponse(e as Error));
  }
};
