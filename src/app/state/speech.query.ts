import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SpeechState, SpeechStore } from './speech.store';
import { map, Observable, tap } from 'rxjs';
import { Speech } from './speech.model';

@Injectable({
  providedIn: 'root'
})
export class SpeechQuery extends QueryEntity<SpeechState> {
  selectSpeechesUI$ = this.select(state => state.ui.speeches);

  constructor(protected override store: SpeechStore) {
    super(store);
  }

  findSpeech(keywords: string, page: number): Observable<Speech[]> {
    const filteredSpeeches$ = this.selectAll().pipe(
      map((speeches) =>
        speeches.filter((speech) =>
          speech.keywords?.includes(keywords))
      ));
    return this.sliceSpeeches(page, filteredSpeeches$);
  }

  selectPage(page: number): Observable<Speech[]> {
    return this.sliceSpeeches(page, this.selectAll());
  }

  sliceSpeeches(page: number, speeches$: Observable<Speech[]>): Observable<Speech[]> {
    return speeches$.pipe(
      map((speeches) => speeches.slice(page * 10, page * 10 + 10)),
      tap((speeches) => this.store.updateUiSpeeches(speeches))
    );
  }
}
