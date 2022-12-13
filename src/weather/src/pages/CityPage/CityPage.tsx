import { useState, useEffect, useMemo, FC, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { useContextSelector } from 'use-context-selector';
import dayjs from 'dayjs';

import type { ForecastData, ForecastItem, WeatherData } from '../../interfaces';
import { formattedTempC, getForecast, getWeather } from '../../utils';
import { defaultForecastData, defaultWeatherData, secondsInHour, zeroK } from '../../constants';
import { AppContext } from '../../context';

import './city-page.scss';

export const CityPage: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData);
  const [forecastData, setForecastData] = useState<ForecastData>(defaultForecastData);

  const { cityId: cityFromParamsName } = useParams();
  const navigate = useNavigate();

  const currentCity = useContextSelector(AppContext, (ctx) => ctx.state.currentCity);
  const favourites = useContextSelector(AppContext, (ctx) => ctx.state.favourites);
  const addToFavourites = useContextSelector(AppContext, (ctx) => ctx.handlers.addToFavourites);

  useEffect(() => {
    if (currentCity || cityFromParamsName) {
      getWeather(`${currentCity ?? cityFromParamsName}`).then((data) => {
        setWeatherData(data);
      });
    }
  }, [cityFromParamsName, currentCity]);

  useEffect(() => {
    if (currentCity || cityFromParamsName) {
      getForecast(`${currentCity ?? cityFromParamsName}`).then((data) => {
        setForecastData(data);
      });
    }
  }, [cityFromParamsName, currentCity]);

  const { cityName, tempC, feelTempC, humidity, forecastItems, description } = useMemo(() => {
    const item = get((weatherData as WeatherData).weather, 0);

    return {
      cityName: weatherData.name,
      tempC: Math.round((weatherData?.main?.temp ?? 0) - zeroK),
      feelTempC: Math.round((weatherData?.main?.feels_like ?? 0) - zeroK),
      humidity: Math.round(weatherData?.main?.humidity ?? 0),
      forecastItems: forecastData.list.reduce(
        (acc: ForecastItem[], forecastItem) => [
          ...acc.filter(
            ({ dt_txt }) => dayjs(dt_txt).format('DD.MM.YY') !== dayjs(forecastItem.dt_txt).format('DD.MM.YY'),
          ),
          forecastItem,
        ],
        [],
      ),
      timezoneOffset: get(forecastData, 'city.timezone', 0) / secondsInHour,
      description: get(item, 'description', ''),
    };
  }, [forecastData, weatherData]);

  const getDescription = (item: ForecastItem): string => get(item, 'weather.0.description');

  const handleAddToFavourites = useCallback(() => {
    addToFavourites(currentCity ?? '');
    if (cityFromParamsName) {
      navigate('/');
    }
  }, [addToFavourites, cityFromParamsName, currentCity, navigate]);

  return (
    <div className="CityPage">
      {currentCity || cityFromParamsName ? (
        <>
          <div className="CityPage__container">
            <div className="CityPage__header">
              <Link to="cities/:cityId">
                <h1>{cityName}</h1>
              </Link>
              <button className="CityPage__btn" type="submit" onClick={handleAddToFavourites}>
                {favourites.includes(currentCity ?? '') ? 'Убрать из избранного' : 'Добавить в избранное'}
              </button>
            </div>

            <div className="CityPage__temp">{`${tempC}°C`}</div>
            <div className="CityPage__feelTemp">{`Ощущается как ${feelTempC}°C`}</div>
          </div>
          <div>
            <div className="CityPage__description">{description}</div>
            <div className="CityPage__humidity">{`Влажность ${humidity}%`}</div>
          </div>
          <h2>Прогноз погоды на 5 дней</h2>
          <div>
            <table className="CityPage__forecastTable">
              <thead>
                <tr>
                  <th className="CityPage__firstColum">Дата</th>
                  <th>Температура</th>
                  <th>Погода</th>
                  <th>Влажность</th>
                </tr>
              </thead>
              <tbody>
                {forecastItems.map((item) => (
                  <tr key={item.dt}>
                    <td>{dayjs(item.dt_txt).format('DD.MM.YY')}</td>
                    <td>{`${formattedTempC(item?.main?.temp ?? 0)} °C`}</td>
                    <td>{getDescription(item)}</td>
                    <td>{`${Math.round(item.main.humidity ?? 0)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>{'< Выберите город'}</div>
      )}
    </div>
  );
};
