import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ChangeSettingsService } from '../services/change-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  model: FormGroup;

  language: string;

  numberOfWords: number;

  constructor(private changeSettings: ChangeSettingsService) {
    this.language = localStorage.getItem('language') ?? '';
    this.numberOfWords = parseInt(localStorage.getItem('numberOfWords') ?? '', 10);

    this.model = new FormGroup({
      language: new FormControl(this.language),
      numberOfWords: new FormControl(this.numberOfWords),
    });

    changeSettings.languageChanged.subscribe((newLanguage) => {
      this.language = newLanguage;
      localStorage.setItem('language', this.language);
    });

    changeSettings.numberOfWordsChanged.subscribe((newNumberOfWords) => {
      this.numberOfWords = newNumberOfWords;
      localStorage.setItem('numberOfWords', this.numberOfWords.toString());
    });
  }

  ngOnInit() {
    this.model.get('language')?.valueChanges.subscribe((value) => this.changeSettings.changeLanguage(value));
    this.model.get('numberOfWords')?.valueChanges.subscribe((value) => this.changeSettings.changeNumberOfWords(value));
  }
}
