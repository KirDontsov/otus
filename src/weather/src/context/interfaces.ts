import type { ReactNode } from 'react';

export type Maybe<V> = V | null;

export interface AppContextProviderProps {
  children: ReactNode | ReactNode[];
}

export interface AppState {
  state: {
    currentCity: Maybe<string>;
    favourites: string[];
  };
  handlers: {
    selectCity: (city: string) => void;
    addToFavourites: (city: string) => void;
  };
}
