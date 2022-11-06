import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { speechTrackBy } from '../../shared/utils/trackbyfn.util';
import { finalize, Observable, switchMap, take } from 'rxjs';
import { Speech } from '../../state/speech.model';
import { SpeechQuery } from '../../state/speech.query';
import { SpeechService } from '../../state/speech.service';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit, OnDestroy {
  @Input() keywords$?: Observable<string>;
  @Input() page?: string;

  speeches$?: Observable<Speech[]>;
  activeSpeechId?: string;
  currentPage: number = 0;
  keywords: string = '';

  trackByFn = speechTrackBy;

  constructor(private speechQuery: SpeechQuery, private speechService: SpeechService) { }

  ngOnInit(): void {
    this.loadSpeeches();
    if (this.page === GeneralTexts.SEARCH) {
      this.keywords$?.pipe(
        untilDestroyed(this),
        switchMap((keywords) => {
          this.speechService.resetUi();
          this.keywords = keywords;
          return this.speechQuery.findSpeech(keywords, this.currentPage).pipe(take(1));
        }),
        finalize(() => this.currentPage++)
      ).subscribe()
    }
    this.speeches$ = this.speechQuery.selectSpeechesUI$;
  }

  ngOnDestroy(): void {
    this.speechService.resetUi();
  }

  loadSpeeches(): void {
    this.page === GeneralTexts.VIEW
      ? this.speechQuery.selectPage(this.currentPage).pipe(take(1)).subscribe()
    : this.speechQuery.findSpeech(this.keywords, this.currentPage).pipe(take(1)).subscribe();
  }

  onScroll() {
    this.currentPage++;
    this.loadSpeeches();
  }

  viewSpeech(speech: Speech): void {
    this.activeSpeechId = speech.id;
    this.speechService.setActive(speech);
  }

}
