import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export interface CurrentWeatherData {
  cloud: number;
  condition: string;
  country: string;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  location: string;
  region: string;
  temp_c: number;
  temp_f: number;
  time_set: string;
  uv: number;
  wind_kph: number;
  wind_mph: number;
}

export interface ForecastData {
  days: ForecastWeatherData[];
}

export interface ForecastWeatherData extends CurrentWeatherData {
  date: Date;
}

interface WeatherState {
  forecast: ForecastData | null;
  weather: CurrentWeatherData | null;
}

const initialState: WeatherState = {
  forecast: null,
  weather: null,
};

export const weatherSlice = createSlice({
  initialState,
  name: "weather",
  reducers: {
    setForecast: (state, action: PayloadAction<ForecastData>) => {
      state.forecast = action.payload;
    },
    setWeather: (state, action: PayloadAction<CurrentWeatherData>) => {
      state.weather = action.payload;
    },
  },
});

export const { setForecast, setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
