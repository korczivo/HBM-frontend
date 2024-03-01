export async function getErrorResponse(
  error: Response | Error,
): Promise<string> {
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
