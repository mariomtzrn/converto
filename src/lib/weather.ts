import { fetchURL } from "@/lib/request";
import { CurrentWeatherData } from "@/slices/weatherSlice";

const { VITE_API_URL } = import.meta.env;

interface Response {
  data: CurrentWeatherData;
  status: string;
}

export async function getCurrentWeather(
  query: string,
): Promise<CurrentWeatherData | null> {
  if (!query) {
    throw new Error("No query provided");
  }
  if (!VITE_API_URL) {
    throw new Error("No API URL provided");
  }
  const url = new URL(VITE_API_URL + `/weather/current`);
  const response = await fetchURL<Response>(url, "POST", {
    query: query,
  });
  if (response.status !== "ok") {
    throw new Error("Error fetching weather");
  }
  return response.data;
}
