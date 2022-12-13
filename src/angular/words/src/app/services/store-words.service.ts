import { Injectable } from '@angular/core';

import { IResponse } from './translate-words.service';

export interface IData {
  [date: string]: {
    [word: string]: {
      ru: string;
      es: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class StoreWordsService {
  data: IData;

  constructor() {
    if (!localStorage.getItem('data')) {
      localStorage.setItem(
        'data',
        JSON.stringify({
          '01.01.2022': {
            friend: {
              ru: 'друг',
              es: 'amigo',
            },
          },
        }),
      );
    }
    this.data = JSON.parse(localStorage.getItem('data') ?? '');
  }

  storeWords(response: IResponse) {
    const date = new Date().toLocaleString().split(',')[0];

    this.data[date] = {
      ...this.data[date],
      [response.word.toLowerCase()]: {
        ru: response.translations.ru.toLowerCase(),
        es: response.translations.es.toLowerCase(),
      },
    };

    localStorage.setItem('data', JSON.stringify(this.data));
  }
}
