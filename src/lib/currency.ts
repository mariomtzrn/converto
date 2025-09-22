import { fetchURL } from "./request";

const { VITE_API_URL } = import.meta.env;

export interface CurrencyInfo {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
  type: string;
}

export interface Rate {
  change: GLfloat;
  name: string;
}

export interface Rates {
  currency: string;
  rates: Rate[];
}

interface ConversionResponse {
  id: string;
  result: string;
}

export async function convertCurrency(
  value: number,
  baseCurrency: string,
  targetCurrency: string,
): Promise<ConversionResponse | null> {
  try {
    // const ratesResult: Rate[] = [];
    const url = new URL(VITE_API_URL + "/currency/convert");
    const response = await fetchURL<{ id: string; result: string }>(
      url,
      "POST",
      {
        baseCurrency: baseCurrency,
        targetCurrency: targetCurrency,
        value: value,
      },
    );
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

export async function getAllCurrencies(): Promise<CurrencyInfo[] | null> {
  try {
    const url = new URL(VITE_API_URL + "/currency/all");
    const response = await fetchURL<CurrencyInfo[]>(url);
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

export async function getSelectedCurrencies(): Promise<CurrencyInfo[] | null> {
  try {
    const url = new URL(VITE_API_URL + "/currency/selected");
    const response = await fetchURL<CurrencyInfo[]>(url);
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
