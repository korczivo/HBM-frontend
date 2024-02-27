import { convertObjectToQueryString } from '@/app/lib/helpers';
import type {
  DatePickerForm,
  DatePickerUseFormProps,
} from '@/views/DatePickerForm/DatePickerForm';

async function getErrorResponse(error: Response | Error): Promise<string> {
  // If the error is an instance of Response, then we assume it has a JSON body
  // and try to parse it to get a better error message
  if (error instanceof Response) {
    let errorMessage: string;

    try {
      // Attempt to parse the JSON body of the error message
      const errorBody = await error.json();

      // In this example, we assume that the error message is returned under the 'message' key in the response body
      errorMessage = errorBody.message;
    } catch (_) {
      // If parsing the error message fails, we fall back to a generic error message
      errorMessage = 'An unknown error occurred';
    }

    return errorMessage;
  }

  // If the error is anything else, we simply return its message string
  return error.message;
}

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
