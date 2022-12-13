import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IResponse {
  word: string;
  translations: {
    ru: string;
    es: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TranslateWordsService {
  private text = '';

  public translateWords: Observable<IResponse>;

  constructor() {
    this.translateWords = Observable.create((observer: Observer<IResponse>) => {
      this.text.split(' ').forEach(async (word) => {
        const translations = {
          ru: '',
          es: '',
        };

        for (const language of Object.keys(translations)) {
          const translation = await axios({
            method: 'POST',
            url: environment.url,
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-host': environment.xRapidapiHost,
              'x-rapidapi-key': environment.xRapidapiKey,
              accept: 'application/json',
              useQueryString: true,
            },
            params: {
              profanityAction: 'NoAction',
              textType: 'plain',
              to: language,
              'api-version': '3.0',
            },
            data: [
              {
                Text: word,
              },
            ],
          });

          // @ts-ignore
          translations[language] = translation.data[0].translations[0].text;
        }

        observer.next({
          word,
          translations,
        });
      });
    });
  }

  setText(newText: string): void {
    this.text = newText;
  }
}
