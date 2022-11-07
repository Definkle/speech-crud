import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechQuery } from '../../state/speech/speech.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SpeechService } from '../../state/speech/speech.service';
import { ProjectConst } from '../../config/const';
import { DateUtil } from '../../utils/date.util';
import { filter, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-speech-form',
  templateUrl: './speech-form.component.html',
  styleUrls: ['./speech-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechFormComponent implements OnInit, OnDestroy {
  readonly projectConst = ProjectConst;
  page?: string;
  speechForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private speechQuery: SpeechQuery,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.speechForm = this.formBuilder.group({
      id: [''],
      speech: ['', [Validators.required]],
      author: ['', [Validators.required]],
      keywords: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.page = this.activatedRoute.snapshot.routeConfig?.path;
    this.page === this.projectConst.Search && this.speechForm.disable();
    this.setFormValue();
  }

  ngOnDestroy(): void {
    this.speechService.clearActive();
  }

  addSpeech(): void {
    this.speechService.addSpeech(this.speechForm.value);
    this.resetForm();
  }

  deleteSpeech(speechId: string): void {
    this.speechService.deleteSpeech(speechId);
    this.resetForm();
  }

  updateSpeech(): void {
    this.speechService.updateSpeech(this.speechForm.value);
  }

  /**
   * Sets the form value based on the active speech in the store.
   */
  private setFormValue(): void {
    this.speechQuery
      .selectActive()
      .pipe(
        untilDestroyed(this),
        filter(
          (activeSpeech) =>
            !!(activeSpeech?.id.length && this.page !== this.projectConst.Add)
        ),
        tap((activeSpeech) => {
          this.speechForm.setValue({
            ...activeSpeech,
            date: DateUtil.format(activeSpeech!.date),
          });
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  private resetForm(): void {
    this.speechForm.reset();
  }
}
