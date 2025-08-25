export type UnitCategoryKey = keyof typeof unitCategories;

export const unitCategories = {
  currency: {
    label: "Currency",
    units: ["Currency"],
  },
  digital: {
    label: "Digital",
    units: ["Digital"],
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

export const getCategoryLabels = () => {
  return Object.values(unitCategories).map((category) => category.label);
};

export const getUnitsByCategory = (category: UnitCategoryKey) => {
  return unitCategories[category].units;
};
