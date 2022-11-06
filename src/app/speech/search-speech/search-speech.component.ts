import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

@Component({
  selector: 'app-search-speech',
  templateUrl: './search-speech.component.html',
  styleUrls: ['./search-speech.component.scss'],
})
export class SearchSpeechComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  readonly generalTexts = GeneralTexts;
  keywords$: BehaviorSubject<string> = new BehaviorSubject('');

  findSpeech(): void {
    const searchValue = this.searchInput.nativeElement.value;
    this.keywords$.next(searchValue);
  }
}
