import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { speechTrackBy } from '../../shared/utils/trackbyfn.util';
import { filter, Observable, switchMap } from 'rxjs';
import { Speech } from '../../state/speech.model';
import { SpeechQuery } from '../../state/speech.query';
import { SpeechService } from '../../state/speech.service';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})
export class SpeechComponent implements OnInit, OnDestroy {
  @Input() keywords$?: Observable<string>;
  @Input() page: string = GeneralTexts.VIEW;

  speeches$!: Observable<Speech[]>;
  activeSpeechId?: string;

  trackByFn = speechTrackBy;

  constructor(
    private speechQuery: SpeechQuery,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.loadSpeeches();
  }

  ngOnDestroy(): void {
    this.speechService.resetUi();
    this.speechQuery.resetLastProperties();
  }

  loadSpeeches(): void {
    if (this.page === GeneralTexts.VIEW) {
      this.speeches$ = this.speechQuery.selectAll$();
      return;
    }
    this.speeches$ = this.keywords$?.pipe(
      filter(() => this.page === GeneralTexts.SEARCH),
      switchMap((keywords) => {
        this.speechService.resetUi();
        return this.speechQuery.findSpeech$(keywords);
      })
    ) as Observable<Speech[]>;
  }

  onScroll() {
    this.speechService.updatePage(this.speechQuery.getValue().ui.page + 1);
  }

  viewSpeech(speech: Speech): void {
    this.activeSpeechId = speech.id;
    this.speechService.setActive(speech);
  }
}
