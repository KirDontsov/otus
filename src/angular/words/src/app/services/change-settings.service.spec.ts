import { TestBed } from '@angular/core/testing';

import { ChangeSettingsService } from './change-settings.service';

describe('ChangeSettingsService', () => {
  let service: ChangeSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change language', () => {
    let changed = false;

    service.languageChanged.subscribe(() => {
      changed = true;
    });

    service.changeLanguage('ru');
    expect(changed).toBeTrue();
  });

  it('should change number of words', () => {
    let changed = false;

    service.numberOfWordsChanged.subscribe(() => {
      changed = true;
    });

    service.changeNumberOfWords(10);
    expect(changed).toBeTrue();
  });
});
