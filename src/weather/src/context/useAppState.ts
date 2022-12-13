import { useEffect, useState } from 'react';

import { localStorageAppPrefix } from '../constants';

import type { AppState } from './interfaces';

const getSavedFavourites = (): string[] => {
  const saved = localStorage.getItem(`${localStorageAppPrefix}.favourites`);

  if (!saved) {
    return [];
  }

  return JSON.parse(saved);
};

const saveFavorites = (favourites: string[]) =>
  localStorage.setItem(`${localStorageAppPrefix}.favourites`, JSON.stringify(favourites));

export function useAppState(): AppState {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  useEffect(() => {
    setFavourites(getSavedFavourites());
  }, []);

  const handleSelectCity = (city: string): void => {
    setCurrentCity(city);
  };

  const addToFavourites = (city: string): void => {
    let newFavourites;

    if (favourites.includes(city)) {
      newFavourites = favourites.filter((item) => item !== city);
    } else {
      newFavourites = [...favourites, city];
    }

    setFavourites(newFavourites);
    saveFavorites(newFavourites);
  };

  return {
    state: {
      currentCity,
      favourites,
    },
    handlers: {
      selectCity: handleSelectCity,
      addToFavourites,
    },
  };
}
