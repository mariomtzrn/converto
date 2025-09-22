import { fetchURL } from "./request";

const { VITE_API_URL } = import.meta.env;

export interface ConversionHistoryResponse {
  history: ConversionRow[];
  rows: number;
}

export interface ConversionRow {
  conversion_type: string;
  created_at: string;
  from_unit: string;
  from_value: number;
  id?: string;
  to_unit: string;
  to_value: number;
  user_id: string;
}

export async function getConversionHistory(
  userID: string,
  conversionType: string,
  createdAt: string,
  limit: number,
  page: number,
): Promise<ConversionHistoryResponse | null> {
  try {
    const url = new URL(VITE_API_URL + "/history");
    url.searchParams.append("userID", userID);
    url.searchParams.append("conversionType", conversionType);
    url.searchParams.append("createdAt", createdAt);
    url.searchParams.append("limitPerPage", limit.toString());
    url.searchParams.append("page", page.toString());
    const response = await fetchURL<ConversionHistoryResponse>(url);
    if (!response) {
      throw new Error(`Response status: 500`);
    }
    console.log({ response });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
