import Weather from "@/components/Weather";
import { CurrentWeatherData } from "@/slices/weatherSlice";

import "./App.css";

function App() {
  const currentWeather: CurrentWeatherData = {
    cloud: 0,
    condition: "Sunny",
    country: "Mexico",
    feelslike_c: 12,
    feelslike_f: 70,
    humidity: 0,
    location: "Mexico City",
    region: "The Federal District",
    temp_c: 10,
    temp_f: 60,
    time_set: "2023-12-31 12:00:00",
    uv: 14,
    wind_kph: 60,
    wind_mph: 90,
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Weather weather={currentWeather} />
      </div>
    </>
  );
}

export default App;
