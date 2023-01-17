import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { StoreWordsService, IData } from '../services/store-words.service';
import { ChangeSettingsService } from '../services/change-settings.service';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.scss'],
})
export class GoComponent implements OnInit {
  model: FormGroup;

  data: IData;

  language: string;

  numberOfWords: number;

  currentNumber: number;

  currentDate: string;

  currentWord: string;

  currentTranslation: string;

  answers: Array<boolean>;

  constructor(private storeWords: StoreWordsService, changeSettings: ChangeSettingsService) {
    this.model = new FormGroup({
      translation: new FormControl(''),
    });

    this.language = localStorage.getItem('language') || 'ru';
    this.numberOfWords = parseInt(localStorage.getItem('numberOfWords') || '', 10) || 10;
    this.data = this.storeWords.data;
    this.currentNumber = 0;
    this.answers = new Array<boolean>(this.numberOfWords);

    changeSettings.languageChanged.subscribe((newLanguage) => {
      this.language = newLanguage;
      localStorage.setItem('language', this.language);
    });

    changeSettings.numberOfWordsChanged.subscribe((newNumberOfWords) => {
      this.numberOfWords = newNumberOfWords;
      localStorage.setItem('numberOfWords', this.numberOfWords.toString());
    });

    this.getRandom();
  }

  getRandom() {
    this.currentDate = Object.keys(this.data)[Math.floor(Math.random() * Object.keys(this.data).length)];
    this.currentWord = Object.keys(this.data[this.currentDate])[
      Math.floor(Math.random() * Object.keys(this.data[this.currentDate]).length)
    ];
  }

  checkTranslation() {
    this.answers[(this.currentNumber += 1)] =
      // @ts-ignore
      this.data[this.currentDate][this.currentWord][this.language] === this.currentTranslation;

    this.currentTranslation = '';

    if (this.currentNumber === this.numberOfWords) {
      this.model.disable();
    } else {
      this.getRandom();
    }
  }

  ngOnInit() {
    this.model.get('translation')?.valueChanges.subscribe((value: string) => {
      this.currentTranslation = value.toLowerCase();
    });
  }
}
