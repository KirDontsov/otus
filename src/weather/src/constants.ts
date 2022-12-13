import type { ForecastData, WeatherData } from './interfaces';

export const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
export const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
export const secondsInHour = 3600;
export const localStorageAppPrefix = 'weatherApp';
export const zeroK = 273.15;
export const defaultWeatherData: WeatherData = { main: {} };
export const defaultForecastData: ForecastData = { cod: '200', message: 0, cnt: 0, list: [] };
