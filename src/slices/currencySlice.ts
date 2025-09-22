import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { CurrencyInfo } from "@/lib/currency";
import { ConversionRow } from "@/lib/history";

// Define a type for the slice state
interface CurrencyState {
  conversionHistory: ConversionRow[];
  currentPage: number;
  itemsPerPage: number;
  selectedCurrencies: CurrencyInfo[];
  totalConversions: number;
}

// Define the initial state using that type
const initialState: CurrencyState = {
  conversionHistory: [],
  currentPage: 1,
  itemsPerPage: 10,
  selectedCurrencies: [],
  totalConversions: 0,
};

export const currencySlice = createSlice({
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  name: "currency",
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
    setSelectedCurrencies: (state, action: PayloadAction<CurrencyInfo[]>) => {
      state.selectedCurrencies = action.payload;
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
  setSelectedCurrencies,
  setTotalConversions,
} = currencySlice.actions;

export default currencySlice.reducer;
