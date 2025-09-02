import { fetchURL } from "./request";

const { VITE_API_URL } = import.meta.env;

export interface ConversionHistoryResponse {
  data: ConversionRow[];
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

export interface ConversionRowsResponse {
  data: string;
}

export async function getConversionHistory(
  userID: string,
  conversionType: string,
  createdAt: string,
  limit: number,
): Promise<ConversionHistoryResponse | null> {
  try {
    const url = new URL(VITE_API_URL + "/history");
    url.searchParams.append("userID", userID);
    url.searchParams.append("conversionType", conversionType);
    url.searchParams.append("createdAt", createdAt);
    url.searchParams.append("limit", limit.toString());
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

export async function getHistoryRowCount(
  userID: string,
  conversionType: string,
): Promise<null | number> {
  try {
    const url = new URL(VITE_API_URL + "/history/count");
    url.searchParams.append("userID", userID);
    url.searchParams.append("conversionType", conversionType);
    const response = await fetchURL<ConversionRowsResponse>(url);
    console.log({ response });
    if (!response) {
      throw new Error(`Response status: 500`);
    }
    return Number(response.data);
  } catch (error) {
    console.error(error);
    return null;
  }
}
