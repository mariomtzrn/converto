import { SimpleGrid } from "@chakra-ui/react";

import ConversionHistoryBox from "@/components/ConversionHistoryBox";
import { ConversionRow } from "@/lib/history";

interface Props {
  items: ConversionRow[];
}

export default function ConversionHistoryItems({ items }: Props) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, sm: 2 }}
      gap={{ base: 4, md: 6, sm: 4 }}
      p={0}
      w="100%"
    >
      {items.map((row, index) => (
        <ConversionHistoryBox key={index} row={row} />
      ))}
    </SimpleGrid>
  );
}
