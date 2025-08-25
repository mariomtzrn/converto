import { GridItem, SimpleGrid, VStack } from "@chakra-ui/react";

import HomeUnitSwitch from "@/components/HomeUnitSwitch";
import Weather from "@/components/Weather";
import useWeather from "@/hooks/useWeather";

export default function Home() {
  const weather = useWeather();

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 4, md: 4 }}>
      <GridItem colSpan={{ base: 1, md: 1 }} key={0}>
        <VStack gap={{ base: 2, md: 0 }}>
          <Weather weather={weather} />
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }} key={1}>
        <VStack gap={{ base: 2, md: 4 }}>
          <HomeUnitSwitch />
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
}
