export default function handleRequestError(statusCode: number) {
  switch (statusCode) {
    case 400:
      return "Bad request";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not found";
    case 429:
      return "Try again later";
    case 500:
      return "Internal server error";
    case 503:
      return "Service unavailable";
    case 504:
      return "Gateway timeout";
  }
}
