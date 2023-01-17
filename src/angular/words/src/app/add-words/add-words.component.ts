import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AddWordsService } from '../services/add-words.service';
import { TranslateWordsService } from '../services/translate-words.service';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.scss'],
})
export class AddWordsComponent implements OnInit {
  model: FormGroup;

  constructor(
    private addWords: AddWordsService,
    private translateWords: TranslateWordsService,
    private router: Router,
  ) {
    this.model = new FormGroup({
      text: new FormControl(''),
    });
  }

  onAddWords() {
    this.addWords.addWords();
    this.router.navigate(['/recently-added']);
  }

  ngOnInit() {
    this.model.get('text')?.valueChanges.subscribe((value) => this.translateWords.setText(value));
  }
}
