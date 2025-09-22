import handleRequestError from "./error";

export async function fetchURL<T>(
  url: URL,
  method?: string,
  body?: object,
): Promise<T> {
  const options: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: method ?? "GET",
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = handleRequestError(response.status);
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}
