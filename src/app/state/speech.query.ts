import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SpeechState, SpeechStore } from './speech.store';
import { combineLatest, map, Observable } from 'rxjs';
import { Speech } from './speech.model';

@Injectable({
  providedIn: 'root',
})
export class SpeechQuery extends QueryEntity<SpeechState> {
  selectPage$ = this.select((state) => state.ui.page);
  lastKeywords?: string;
  lastPage?: number;
  lastSpeeches?: Speech[];

  constructor(protected override store: SpeechStore) {
    super(store);
  }

  findSpeech$(keywords: string): Observable<Speech[]> {
    return combineLatest([this.selectPage$, this.selectAll()]).pipe(
      map(([page, speeches]) => {
        const filteredSpeeches = speeches.filter((speech) => {
          const lowerCaseKeywords = keywords.toLowerCase();
          return (
            speech.keywords?.toLowerCase().includes(lowerCaseKeywords) ||
            speech.author?.toLowerCase().includes(lowerCaseKeywords)
          );
        });
        if (keywords === this.lastKeywords) {
          return this.combineSpeeches(speeches, false, page, keywords);
        } else {
          const slicedSpeeches = filteredSpeeches.slice(
            page * 10,
            page * 10 + 10
          );
          this.lastKeywords = keywords;
          this.lastSpeeches = slicedSpeeches;
          return slicedSpeeches;
        }
      })
    );
  }

  selectAll$(): Observable<Speech[]> {
    return combineLatest([this.selectPage$, this.selectAll()]).pipe(
      map(([page, speeches]) => {
        if (page !== this.lastPage) {
          return this.combineSpeeches(speeches, true, page);
        } else {
          const slicedSpeeches = speeches.slice(
            0,
            Number(this.lastSpeeches?.length)
          );
          this.lastSpeeches = slicedSpeeches;
          return slicedSpeeches;
        }
      })
    );
  }

  resetLastProperties(): void {
    this.lastKeywords = this.lastPage = this.lastSpeeches = undefined;
  }

  private combineSpeeches(
    speeches: Speech[],
    isViewPage: boolean,
    page: number,
    keywords?: string
  ): Speech[] {
    const slicedSpeeches = isViewPage
      ? speeches.slice(page * 10, page * 10 + 10)
      : speeches.slice(0, Number(this.lastSpeeches?.length));
    if (this.lastSpeeches?.length) {
      const combinedSpeeches = [...this.lastSpeeches, ...slicedSpeeches];
      this.lastKeywords = keywords;
      this.lastPage = page;
      this.lastSpeeches = combinedSpeeches;
      return combinedSpeeches;
    }
    this.lastKeywords = keywords;
    this.lastPage = page;
    this.lastSpeeches = slicedSpeeches;
    return slicedSpeeches;
  }
}
