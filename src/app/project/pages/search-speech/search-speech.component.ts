import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectConst } from '../../config/const';

@Component({
  selector: 'app-search-speech-list',
  templateUrl: './search-speech.component.html',
  styleUrls: ['./search-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSpeechComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  readonly projectConst = ProjectConst;
  keywords$: BehaviorSubject<string> = new BehaviorSubject('');

  findSpeech(): void {
    const searchValue = this.searchInput.nativeElement.value;
    this.keywords$.next(searchValue);
  }
}
