import { GridItem, SimpleGrid } from "@chakra-ui/react";

import CardWrapper from "@/components/CardWrapper";
import ConversionHistory from "@/components/ConversionHistory";
import UnitCalculator from "@/components/UnitCalculator";

interface PageProps {
  unitName: string;
}

export default function UnitPage({ unitName }: PageProps) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 4 }}
      gap={{ base: 4, md: 4 }}
      marginLeft={{
        base: 0,
        md: 24,
      }}
      marginRight={{
        base: 0,
        md: 24,
      }}
    >
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <CardWrapper
          boxDescription={"Select the units to convert."}
          boxTitle={"Length Unit Converter"}
          desktopWidth="100%"
          isLoading={false}
          mobileWidth="100%"
        >
          <UnitCalculator unitName={unitName} />
        </CardWrapper>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <ConversionHistory unitName={unitName} />
      </GridItem>
    </SimpleGrid>
  );
}
