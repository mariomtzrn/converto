import { GridItem, SimpleGrid } from "@chakra-ui/react";

import Weather from "@/components/Weather";

export default function Home() {
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

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      <GridItem colSpan={{ base: 1, md: 3 }}>
        <Weather weather={weather} />
      </GridItem>
    </SimpleGrid>
  );
}
