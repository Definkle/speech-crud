import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechQuery } from '../../state/speech.query';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';
import { formatDate } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpeechService } from '../../state/speech.service';

@UntilDestroy()
@Component({
  selector: 'app-speech-form',
  templateUrl: './speech-form.component.html',
  styleUrls: ['./speech-form.component.scss']
})
export class SpeechFormComponent implements OnInit, OnDestroy {
  @Input() page!: string;
  speechForm!: FormGroup;
  generalTexts = GeneralTexts;

  constructor(private formBuilder: FormBuilder, private speechQuery: SpeechQuery, private speechService: SpeechService) {
  }

  ngOnInit(): void {
    this.speechForm = this.formBuilder.group({
      id: [''],
      speech: ['', [Validators.required]],
      author: ['', [Validators.required]],
      keywords: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
    this.page === this.generalTexts.SEARCH && this.speechForm.disable();
    this.speechQuery.selectActive().pipe(untilDestroyed(this)).subscribe((activeSpeech) => {
      if (activeSpeech?.id.length && this.page !== this.generalTexts.ADD) {
        this.speechForm.setValue({ ...activeSpeech, date: formatDate(activeSpeech.date, 'yyyy-MM-dd', 'en-US') });
      }
    });
  }

  ngOnDestroy(): void {
    this.speechService.clearActive();
  }

  addSpeech(): void {
    this.speechService.addSpeech(this.speechForm.value);
    this.resetForm();
  }

  deleteSpeech(speechId: string): void {
    if (speechId.length) {
      this.speechService.deleteSpeech(speechId);
      this.resetForm();
    }
  }

  updateSpeech(): void {
    this.speechService.updateSpeech(this.speechForm.value);
  }

  resetForm(): void {
    this.speechForm.reset();
  }

}
