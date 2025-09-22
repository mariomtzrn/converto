import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { system } from "@/components/ui/provider";
import Weather from "@/components/Weather";

const weather = {
  cloud: 0,
  condition: "sunny",
  country: "Mexico",
  feelslike_c: 30,
  feelslike_f: 90,
  humidity: 45,
  location: "La Penita",
  region: "Tamaulipas",
  temp_c: 24,
  temp_f: 77,
  time_set: "01:01:01 24-07-25",
  uv: 14,
  wind_kph: 100,
  wind_mph: 160,
};

test("renders weather widget with temperature in Celsius", () => {
  render(
    <ChakraProvider value={system}>
      <Weather weather={weather} />
    </ChakraProvider>,
  );

  expect(screen.getByText("24 °C")).toBeInTheDocument();
});

test("renders weather widget with temperature in Fahrenheit", () => {
  render(
    <ChakraProvider value={system}>
      <Weather weather={weather} />
    </ChakraProvider>,
  );

  expect(screen.getByText("77 °F")).toBeInTheDocument();
});

test("renders weather widget with humidity", () => {
  render(
    <ChakraProvider value={system}>
      <Weather weather={weather} />
    </ChakraProvider>,
  );

  expect(screen.getByText("45 %")).toBeInTheDocument();
});
