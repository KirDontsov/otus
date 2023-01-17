import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeSettingsService {
  private languageChangedSource: Subject<string>;

  languageChanged: Observable<string>;

  private numberOfWordsChangedSource: Subject<number>;

  numberOfWordsChanged: Observable<number>;

  constructor() {
    this.languageChangedSource = new Subject<string>();
    this.languageChanged = this.languageChangedSource.asObservable();
    this.numberOfWordsChangedSource = new Subject<number>();
    this.numberOfWordsChanged = this.numberOfWordsChangedSource.asObservable();
  }

  changeLanguage(newLanguage: string) {
    this.languageChangedSource.next(newLanguage);
  }

  changeNumberOfWords(newNumberOfWords: number) {
    this.numberOfWordsChangedSource.next(newNumberOfWords);
  }
}
