import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export interface CurrentWeatherData {
  cloud: number;
  condition: string;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  location: string;
  region: string;
  temp_c: number;
  temp_f: number;
  time_set: string;
  wind_kph: number;
  wind_mph: number;
}

interface WeatherState {
  weather: CurrentWeatherData | null;
}

const initialState: WeatherState = {
  weather: null,
};

export const weatherSlice = createSlice({
  initialState,
  name: "weather",
  reducers: {
    setWeather: (state, action: PayloadAction<CurrentWeatherData>) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
