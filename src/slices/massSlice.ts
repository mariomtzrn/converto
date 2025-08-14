import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { ConversionRow } from "@/lib/history";

// Define a type for the slice state
interface MassState {
  conversionHistory: ConversionRow[];
  currentPage: number;
  itemsPerPage: number;
  selectedUnits: string[];
  totalConversions: number;
}

// Define the initial state using that type
const initialState: MassState = {
  conversionHistory: [],
  currentPage: 1,
  itemsPerPage: 10,
  selectedUnits: [],
  totalConversions: 0,
};

export const massSlice = createSlice({
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  name: "mass",
  reducers: {
    addToHistory: (state, action: PayloadAction<ConversionRow>) => {
      state.conversionHistory = [action.payload, ...state.conversionHistory];
    },
    clearHistory: (state) => {
      state.conversionHistory = [];
    },
    removeFromHistory: (state, action: PayloadAction<number>) => {
      state.conversionHistory.splice(action.payload, 1);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHistory: (state, action: PayloadAction<ConversionRow[]>) => {
      state.conversionHistory = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setSelectedUnits: (state, action: PayloadAction<string[]>) => {
      state.selectedUnits = action.payload;
    },
    setTotalConversions: (state, action: PayloadAction<number>) => {
      state.totalConversions = action.payload;
    },
  },
});

export const {
  addToHistory,
  clearHistory,
  removeFromHistory,
  setCurrentPage,
  setHistory,
  setItemsPerPage,
  setSelectedUnits,
  setTotalConversions,
} = massSlice.actions;

export default massSlice.reducer;
