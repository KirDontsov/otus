import axios from 'axios';

import { forecastApiUrl, weatherApiUrl, zeroK } from './constants';
import type { ForecastData, WeatherData } from './interfaces';

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const { data } = await axios.get(weatherApiUrl, {
      params: {
        q: city,
        APPID: import.meta.env.VITE_API_KEY,
        lang: 'ru',
      },
    });

    return data;
  } catch (e) {
    // @ts-ignore
    throw new Error(e.message);
  }
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const { data } = await axios.get(forecastApiUrl, {
      params: {
        q: city,
        appid: import.meta.env.VITE_API_KEY,
        lang: 'ru',
      },
    });

    return data;
  } catch (e) {
    // @ts-ignore
    throw new Error(e.message);
  }
};

export const formattedTempC = (tempK: number): number => Math.round(tempK - zeroK);
