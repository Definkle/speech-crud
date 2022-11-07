import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { speechTrackBy } from '../../../shared/utils/trackbyfn.util';
import { filter, Observable, switchMap } from 'rxjs';
import { Speech } from '../../state/speech/speech.model';
import { SpeechQuery } from '../../state/speech/speech.query';
import { SpeechService } from '../../state/speech/speech.service';
import { ProjectConst } from '../../config/const';

@Component({
  selector: 'app-speech-list',
  templateUrl: './speech-list.component.html',
  styleUrls: ['./speech-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechListComponent implements OnInit, OnDestroy {
  @Input() keywords$?: Observable<string>;
  @Input() page: string = ProjectConst.View;

  speeches$!: Observable<Speech[]>;
  activeSpeechId$?: Observable<string | null | undefined>;

  trackByFn = speechTrackBy;

  constructor(
    private speechQuery: SpeechQuery,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.loadSpeeches();
    this.activeSpeechId$ = <Observable<string | null | undefined>>(
      this.speechQuery.selectActiveId()
    );
  }

  ngOnDestroy(): void {
    this.speechService.resetUi();
    this.speechQuery.resetLastProperties();
  }

  loadSpeeches(): void {
    if (this.page === ProjectConst.View) {
      this.speeches$ = this.speechQuery.selectAll$();
      return;
    }

    //Subscribe and find speeches based on user input.
    this.speeches$ = this.keywords$?.pipe(
      filter(() => this.page === ProjectConst.Search),
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
    this.speechService.setActive(speech);
  }
}
