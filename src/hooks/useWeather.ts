import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCurrentWeather } from "@/lib/weather";
import { setWeather } from "@/slices/weatherSlice";

export default function useWeather() {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather.weather);

  useEffect(() => {
    async function fetchWeather() {
      try {
        if (navigator.geolocation) {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            },
          );
          const { latitude, longitude } = position.coords;
          const weatherResult = await getCurrentWeather(
            `${latitude},${longitude}`,
          );
          const timeSet = new Date().toLocaleTimeString("en-US");
          dispatch(setWeather({ ...weatherResult, time_set: timeSet }));
        }
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    }

    // only re-fetch if the data is too old
    if (!weather) {
      fetchWeather();
    } else {
      const now = new Date();
      const last = new Date(weather.time_set);
      const diffInHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
      if (diffInHours > 1) {
        fetchWeather();
      }
    }
  }, [weather, dispatch]);

  return weather;
}
