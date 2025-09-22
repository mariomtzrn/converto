import { Box, Container, Flex, Separator, Text } from "@chakra-ui/react";

import { CurrentWeatherData } from "@/slices/weatherSlice";

import CardWrapper from "../CardWrapper";
import WeatherIcon from "../WeatherIcon";

interface Props {
  weather: CurrentWeatherData | null;
}

export default function Weather(props: Props) {
  const { weather } = props;

  if (!weather) {
    return (
      <CardWrapper desktopWidth="320px" isLoading={true} mobileWidth="100%">
        <Text>Loading...</Text>
      </CardWrapper>
    );
  }

  const boxDescription = "" + weather.region + ", " + weather.country;

  return (
    <CardWrapper
      boxDescription={boxDescription}
      boxTitle={weather.location}
      desktopWidth="320px"
      isLoading={false}
      mobileWidth="100%"
    >
      <Box position="absolute" right={4} top={4}>
        <WeatherIcon
          height={60}
          weather={weather?.condition || ""}
          width={60}
        />
      </Box>
      <Box>
        <Flex align="center" direction="row" justify="flex-start">
          <Container padding={0}>
            <Text cursor="pointer" fontSize="2.5rem" fontWeight="bold">
              {weather.temp_c.toFixed()} °C
            </Text>
          </Container>
          <Container maxW="40%" padding={0}>
            <Text color="gray.400" fontSize="0.7rem" fontWeight="bold">
              Feels like
            </Text>
            <Text color="gray.200" fontSize="1rem" fontWeight="bold">
              {weather.feelslike_c.toFixed()} °C
            </Text>
          </Container>
        </Flex>
      </Box>
      <Separator />
      <Box>
        <Flex align="center" direction="row" justify="flex-start">
          <Container padding={0}>
            <Text cursor="pointer" fontSize="2.5rem" fontWeight="bold">
              {weather.temp_f.toFixed()} °F
            </Text>
          </Container>
          <Container maxW="40%" padding={0}>
            <Text color="gray.400" fontSize="0.7rem" fontWeight="bold">
              Feels like
            </Text>
            <Text color="gray.200" fontSize="1rem" fontWeight="bold">
              {weather.feelslike_f.toFixed()} °F
            </Text>
          </Container>
        </Flex>
      </Box>
      <Box
        backdropBlur="20px"
        backgroundColor="rgba(255, 255, 255, 0.5)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        borderRadius="8px"
        boxShadow="0 1px 12px rgba(0, 0, 0, 0.25)"
        padding="1rem 0"
      >
        <Flex align="center" direction="row" justify="center">
          <Container padding={0} textAlign="center">
            <Text fontSize="0.7rem" fontWeight="bold">
              Humidity
            </Text>
            <Text fontSize="1rem" fontWeight="bold">
              {weather.humidity} %
            </Text>
          </Container>
          <Container padding={0} textAlign="center">
            <Text fontSize="0.7rem" fontWeight="bold">
              Wind
            </Text>
            <Text fontSize="1rem" fontWeight="bold">
              {weather.wind_kph} km/h
            </Text>
          </Container>
          <Container padding={0} textAlign="center">
            <Text fontSize="0.7rem" fontWeight="bold">
              UV Index
            </Text>
            <Text fontSize="1rem" fontWeight="bold">
              {weather.uv}
            </Text>
          </Container>
        </Flex>
      </Box>
    </CardWrapper>
  );
}
