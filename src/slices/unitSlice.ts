import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { ConversionRow } from "@/lib/history";

type ConversionState = Record<
  string,
  {
    currentPage: number;
    currentPageItems: ConversionRow[];
    invalidatedHistory: number;
    itemsPerPage: number;
    selectedUnits: string[];
    totalConversions: number;
  }
>;

const initialUnitState = {
  currentPage: 1,
  currentPageItems: [],
  invalidatedHistory: 0,
  itemsPerPage: 10,
  selectedUnits: [],
  totalConversions: 0,
};

const initialState: ConversionState = {
  angle: initialUnitState,
  area: initialUnitState,
  energy: initialUnitState,
  filesize: initialUnitState,
  force: initialUnitState,
  frequency: initialUnitState,
  illuminance: initialUnitState,
  length: initialUnitState,
  mass: initialUnitState,
  power: initialUnitState,
  pressure: initialUnitState,
  speed: initialUnitState,
  temperature: initialUnitState,
  time: initialUnitState,
  voltage: initialUnitState,
  volume: initialUnitState,
};

export const unitSlice = createSlice({
  initialState,
  name: "units",
  reducers: {
    addToCurrentPage: (
      state,
      action: PayloadAction<{ conversion: ConversionRow; unitType: string }>,
    ) => {
      const { conversion, unitType } = action.payload;
      state[unitType].currentPageItems = [
        conversion,
        ...state[unitType].currentPageItems,
      ];
    },
    addToTotalConversions: (
      state,
      action: PayloadAction<{ unitType: string }>,
    ) => {
      const { unitType } = action.payload;
      state[unitType].totalConversions += 1;
    },
    clearCurrentPage: (state, action: PayloadAction<{ unitType: string }>) => {
      const { unitType } = action.payload;
      state[unitType].currentPageItems = [];
    },
    removeFromCurrentPage: (
      state,
      action: PayloadAction<{ index: number; unitType: string }>,
    ) => {
      const { index, unitType } = action.payload;
      state[unitType].currentPageItems.splice(index, 1);
    },
    setCurrentPage: (
      state,
      action: PayloadAction<{ currentPage: number; unitType: string }>,
    ) => {
      const { currentPage, unitType } = action.payload;
      state[unitType].currentPage = currentPage;
    },
    setHistory: (
      state,
      action: PayloadAction<{ history: ConversionRow[]; unitType: string }>,
    ) => {
      const { history, unitType } = action.payload;
      state[unitType].currentPageItems = history;
    },
    setInvalidatedHistory: (
      state,
      action: PayloadAction<{ unitType: string }>,
    ) => {
      const { unitType } = action.payload;
      state[unitType].invalidatedHistory += 1;
      state[unitType].currentPage = 1;
    },
    setItemsPerPage: (
      state,
      action: PayloadAction<{ itemsPerPage: number; unitType: string }>,
    ) => {
      const { itemsPerPage, unitType } = action.payload;
      state[unitType].itemsPerPage = itemsPerPage;
    },
    setSelectedUnits: (
      state,
      action: PayloadAction<{ selectedUnits: string[]; unitType: string }>,
    ) => {
      const { selectedUnits, unitType } = action.payload;
      state[unitType].selectedUnits = selectedUnits;
    },
    setTotalConversions: (
      state,
      action: PayloadAction<{ totalConversions: number; unitType: string }>,
    ) => {
      const { totalConversions, unitType } = action.payload;
      state[unitType].totalConversions = totalConversions;
    },
  },
});

export const {
  addToCurrentPage,
  addToTotalConversions,
  clearCurrentPage,
  removeFromCurrentPage,
  setCurrentPage,
  setHistory,
  setInvalidatedHistory,
  setItemsPerPage,
  setSelectedUnits,
  setTotalConversions,
} = unitSlice.actions;

export default unitSlice.reducer;
