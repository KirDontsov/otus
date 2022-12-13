import { TestBed } from '@angular/core/testing';

import { StoreWordsService } from './store-words.service';

describe('StoreWordsService', () => {
  let service: StoreWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change data', () => {
    service.storeWords({
      word: 'day',
      translations: {
        ru: 'день',
        es: 'día',
      },
    });

    expect(service.data).toEqual({
      '01.01.2000': {
        friend: {
          ru: 'друг',
          es: 'amigo',
        },
      },
      [`${new Date().toLocaleString().split(',')[0]}`]: {
        day: {
          ru: 'день',
          es: 'día',
        },
      },
    });
  });
});
