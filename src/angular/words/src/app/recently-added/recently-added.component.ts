import { Component, OnInit } from '@angular/core';

import { StoreWordsService, IData } from '../services/store-words.service';
import { ChangeSettingsService } from '../services/change-settings.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
})
export class RecentlyAddedComponent implements OnInit {
  data: IData;

  language: string;

  constructor(private storeWords: StoreWordsService, changeSettings: ChangeSettingsService) {
    this.language = localStorage.getItem('language') ?? '';

    changeSettings.languageChanged.subscribe((newLanguage) => {
      this.language = newLanguage;
    });
  }

  get dates() {
    this.data = this.storeWords.data;
    return Object.keys(this.data).reverse();
  }

  getWords(date: string) {
    return Object.keys(this.data[date]);
  }

  // eslint-disable-next-line class-methods-use-this
  ngOnInit() {}
}
