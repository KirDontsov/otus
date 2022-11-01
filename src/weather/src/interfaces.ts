export interface WeatherMain {
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
}

export interface WeatherCommon {
  id: number;
  main: string;
  description: string;
}

export interface WeatherData {
  name?: string;
  main?: WeatherMain;
  weather?: WeatherCommon[];
  dt?: number;
  timezone?: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city?: CityData;
}

export interface ForecastItem {
  dt_txt: string;
  dt: number;
  main: WeatherMain;
  weather: WeatherCommon[];
}

export interface CityData {
  timezone: number;
}
