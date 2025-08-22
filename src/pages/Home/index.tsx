import { GridItem, SimpleGrid, VStack } from "@chakra-ui/react";

import CurrencyCalculator from "@/components/CurrencyCalculator";
import Weather from "@/components/Weather";
import useWeather from "@/hooks/useWeather";

export default function Home() {
  const weather = useWeather();

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
