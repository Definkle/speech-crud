import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { speechTrackBy } from '../../shared/utils/trackbyfn.util';
import { UntilDestroy } from '@ngneat/until-destroy';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

@UntilDestroy()
@Component({
  selector: 'app-search-speech',
  templateUrl: './search-speech.component.html',
  styleUrls: ['./search-speech.component.scss']
})
export class SearchSpeechComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  generalTexts = GeneralTexts;
  keywords$: BehaviorSubject<string> = new BehaviorSubject('');

  trackByFn = speechTrackBy;

  constructor() { }

  findSpeech(): void {
    const searchValue = this.searchInput.nativeElement.value;
    this.keywords$.next(searchValue);

  }
}
