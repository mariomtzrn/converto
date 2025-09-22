import { fetchURL } from "@/lib/request";

const { VITE_API_URL } = import.meta.env;

export type UnitCategoryKey = keyof typeof unitCategories;

interface ConversionResponse {
  id: string;
  result: string;
}

export const unitCategories = {
  currency: {
    label: "Currency",
    units: ["Currency"],
  },
  digital: {
    label: "Digital",
    units: ["Filesize"],
  },
  measurement: {
    label: "Measurement",
    units: ["Angle", "Area", "Length", "Volume"],
  },
  physical: {
    label: "Physical",
    units: [
      "Energy",
      "Frequency",
      "Force",
      "Illuminance",
      "Mass",
      "Pressure",
      "Power",
      "Speed",
      "Temperature",
      "Voltage",
    ],
  },
  time: {
    label: "Time",
    units: ["Time"],
  },
};

export async function convertUnit(
  type: string,
  baseUnit: string,
  targetUnit: string,
  value: number,
): Promise<ConversionResponse | null> {
  try {
    const url = new URL(VITE_API_URL + `/unit/convert`);
    const response = await fetchURL<ConversionResponse>(url, "POST", {
      baseUnit: baseUnit,
      targetUnit: targetUnit,
      unitType: type,
      value: value,
    });
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

export function getCategoryLabels() {
  return Object.values(unitCategories).map((category) => category.label);
}

export async function getSelectedUnitTypes(
  unitType: string,
): Promise<null | string[]> {
  try {
    const url = new URL(
      VITE_API_URL + "/unit/types/selected?unitType=" + unitType,
    );
    const response = await fetchURL<string[]>(url);
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

export function getUnitsByCategory(category: UnitCategoryKey) {
  return unitCategories[category].units;
}

export async function getUnitTypes(unitType: string): Promise<null | string[]> {
  try {
    const url = new URL(VITE_API_URL + "/unit/types?unitType=" + unitType);
    const response = await fetchURL<string[]>(url);
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
