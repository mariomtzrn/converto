import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import moment from "moment";

import CardWrapper from "@/components/CardWrapper";
import { ConversionRow } from "@/lib/history";

interface BoxProps {
  row: ConversionRow;
}

export default function ConversionHistoryBox(props: BoxProps) {
  const { row } = props;

  return (
    <CardWrapper
      data-conversion-id={row.id}
      desktopWidth="100%"
      isLoading={false}
      key={row.id}
      mobileWidth="100%"
    >
      <Container
        alignItems="center"
        display="flex"
        flexDir="row"
        justifyContent={"space-evenly"}
      >
        <Box
          alignItems="center"
          display="flex"
          flexDir="column"
          justifyContent={"center"}
          textAlign="center"
        >
          <Heading fontSize={"2xl"}>
            {Number(row.from_value).toFixed(2) == "0.00"
              ? Number(row.from_value).toFixed(4)
              : Number(row.from_value).toFixed(2)}
          </Heading>
          <Text as="span" fontSize={"sm"}>
            {row.from_unit}
          </Text>
        </Box>
        <ChevronRight color="#D4C9BE" size={30} />
        <Box
          alignItems="center"
          display="flex"
          flexDir="column"
          justifyContent={"center"}
          textAlign="center"
        >
          <Heading fontSize={"2xl"}>
            {Number(row.to_value).toFixed(2) == "0.00"
              ? Number(row.to_value).toFixed(4)
              : Number(row.to_value).toFixed(2)}
          </Heading>
          <Text as="span" fontSize={"sm"}>
            {row.to_unit}
          </Text>
        </Box>
      </Container>
      <Container
        alignItems="center"
        display="flex"
        flexDir="row"
        justifyContent={"space-evenly"}
      >
        <Text>
          {moment(new Date()).diff(row.created_at, "d") > 0
            ? moment(row.created_at).format("HH:mm:ss • D MMM, YYYY")
            : moment(row.created_at).fromNow()}
        </Text>
      </Container>
    </CardWrapper>
  );
}
