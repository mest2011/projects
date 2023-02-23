import {
  WiCloud,
  WiCloudy,
  WiDayCloudyHigh,
  WiDayHail,
  WiDayRain,
  WiDaySnowThunderstorm,
  WiDaySunny,
  WiFog,
} from "react-icons/wi";
import { IoIosSnow } from "react-icons/io";

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: "01d" | "02d" | "03d" | "04d" | "09d" | "10d" | "11d" | "13d" | "50d";
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const WeatherIcon = {
  "01d": <WiDaySunny />,
  "02d": <WiDayCloudyHigh />,
  "03d": <WiCloud />,
  "04d": <WiCloudy />,
  "09d": <WiDayHail />,
  "10d": <WiDayRain />,
  "11d": <WiDaySnowThunderstorm />,
  "13d": <IoIosSnow />,
  "50d": <WiFog />,
  "01n": <WiDaySunny />,
  "02n": <WiDayCloudyHigh />,
  "03n": <WiCloud />,
  "04n": <WiCloudy />,
  "09n": <WiDayHail />,
  "10n": <WiDayRain />,
  "11n": <WiDaySnowThunderstorm />,
  "13n": <IoIosSnow />,
  "50n": <WiFog />,
  "000": <></>,
};
