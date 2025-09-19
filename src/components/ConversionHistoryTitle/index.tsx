import { Box, Heading, NativeSelect, Text } from "@chakra-ui/react";

interface Props {
  itemsPerPage: number;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ConversionHistoryBox({
  itemsPerPage,
  onItemsPerPageChange,
}: Props) {
  return (
    <Heading
      as="h2"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      textAlign="left"
    >
      <Text>History</Text>
      <Box
        alignItems={"center"}
        display="flex"
        flexDirection="row"
        gap={2}
        justifyContent={{ base: "start", md: "space-between" }}
      >
        <Text as="span" fontSize="14px">
          Items per page:
        </Text>
        <NativeSelect.Root size="sm" width="80px">
          <NativeSelect.Field
            defaultValue={itemsPerPage}
            onChange={onItemsPerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>
    </Heading>
  );
}
