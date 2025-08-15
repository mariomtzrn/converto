import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Moon,
  Sun,
} from "lucide-react";

interface WeatherIconProps {
  height: number;
  weather: string;
  width: number;
}

export default function WeatherIcon({
  height,
  weather,
  width,
}: WeatherIconProps) {
  switch (weather) {
    case "Blizzard":
      return <CloudSnow height={height} width={width} />;
    case "Blowing snow":
      return <CloudSnow height={height} width={width} />;
    case "Clear":
      return <Moon height={height} width={width} />;
    case "Cloudy":
      return <Cloudy height={height} width={width} />;
    case "Fog":
      return <CloudFog height={height} width={width} />;
    case "Freezing drizzle":
      return <CloudDrizzle height={height} width={width} />;
    case "Freezing fog":
      return <CloudFog height={height} width={width} />;
    case "Heavy freezing drizzle":
      return <CloudDrizzle height={height} width={width} />;
    case "Heavy rain":
      return <CloudRain height={height} width={width} />;
    case "Heavy rain at times":
      return <CloudRain height={height} width={width} />;
    case "Heavy snow":
      return <CloudSnow height={height} width={width} />;
    case "Ice pellets":
      return <CloudHail height={height} width={width} />;
    case "Light drizzle":
      return <CloudDrizzle height={height} width={width} />;
    case "Light freezing rain":
      return <CloudRain height={height} width={width} />;
    case "Light rain":
      return <CloudRain height={height} width={width} />;
    case "Light rain shower":
      return <CloudRain height={height} width={width} />;
    case "Light showers of ice pellets":
      return <CloudHail height={height} width={width} />;
    case "Light sleet":
      return <CloudHail height={height} width={width} />;
    case "Light sleet showers":
      return <CloudHail height={height} width={width} />;
    case "Light snow":
      return <CloudSnow height={height} width={width} />;
    case "Light snow showers":
      return <CloudSnow height={height} width={width} />;
    case "Mist":
      return <CloudFog height={height} width={width} />;
    case "Moderate or heavy freezing rain":
      return <CloudRain height={height} width={width} />;
    case "Moderate or heavy rain shower":
      return <CloudRain height={height} width={width} />;
    case "Moderate or heavy rain with thunder":
      return <CloudLightning height={height} width={width} />;
    case "Moderate or heavy showers of ice pellets":
      return <CloudHail height={height} width={width} />;
    case "Moderate or heavy sleet":
      return <CloudHail height={height} width={width} />;
    case "Moderate or heavy sleet showers":
      return <CloudHail height={height} width={width} />;
    case "Moderate or heavy snow showers":
      return <CloudSnow height={height} width={width} />;
    case "Moderate or heavy snow with thunder":
      return <CloudLightning height={height} width={width} />;
    case "Moderate rain":
      return <CloudRain height={height} width={width} />;
    case "Moderate rain at times":
      return <CloudRain height={height} width={width} />;
    case "Moderate snow":
      return <CloudSnow height={height} width={width} />;
    case "Overcast":
      return <Cloud height={height} width={width} />;
    case "Partly cloudy":
      return <CloudSun height={height} width={width} />;
    case "Patchy freezing drizzle possible":
      return <CloudHail height={height} width={width} />;
    case "Patchy heavy snow":
      return <CloudSnow height={height} width={width} />;
    case "Patchy light drizzle":
      return <CloudDrizzle height={height} width={width} />;
    case "Patchy light rain":
      return <CloudRain height={height} width={width} />;
    case "Patchy light rain with thunder":
      return <CloudLightning height={height} width={width} />;
    case "Patchy light snow":
      return <CloudSnow height={height} width={width} />;
    case "Patchy light snow with thunder":
      return <CloudLightning height={height} width={width} />;
    case "Patchy moderate snow":
      return <CloudSnow height={height} width={width} />;
    case "Patchy rain possible":
      return <CloudRain height={height} width={width} />;
    case "Patchy sleet possible":
      return <CloudHail height={height} width={width} />;
    case "Patchy snow possible":
      return <CloudSnow height={height} width={width} />;
    case "Sunny":
      return <Sun height={height} width={width} />;
    case "Thundery outbreaks possible":
      return <CloudLightning height={height} width={width} />;
    case "Torrential rain shower":
      return <CloudRain height={height} width={width} />;
    default:
      return <Cloud height={height} width={width} />;
  }
}
