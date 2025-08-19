import { GridItem, SimpleGrid, VStack } from "@chakra-ui/react";

import CurrencyCalculator from "@/components/CurrencyCalculator";
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
    <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 4, md: 4 }}>
      <GridItem colSpan={{ base: 1, md: 1 }}>
        <VStack gap={{ base: 2, md: 0 }}>
          <Weather weather={weather} />
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }}>
        <VStack gap={{ base: 2, md: 4 }}>
          <CurrencyCalculator />
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
}
