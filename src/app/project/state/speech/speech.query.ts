import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SpeechState, SpeechStore } from './speech.store';
import { combineLatest, map, Observable } from 'rxjs';
import { Speech } from './speech.model';
import { SpeechUtil } from '../../utils/speech.util';

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

  /**
   * Find a speech via its keywords or author.
   * @param keywords - search input reference.
   * @return Observable of speeches that matches the keywords submitted.
   */
  findSpeech$(keywords: string): Observable<Speech[]> {
    return combineLatest([this.selectPage$, this.selectAll()]).pipe(
      map(([page, speeches]) => {
        const filteredSpeeches = speeches.filter((speech) => {
          return SpeechUtil.hasSearchResults(keywords, speech);
        });

        if (keywords === this.lastKeywords) {
          return this.combineSpeeches(speeches, false, page, keywords);
        }

        const slicedSpeeches = filteredSpeeches.slice(
          page * 10,
          page * 10 + 10
        );

        this.lastKeywords = keywords;
        this.lastSpeeches = slicedSpeeches;
        return slicedSpeeches;
      })
    );
  }

  /**
   * Returns all the speeches from the Speech store.
   * Triggers every time the page increments from the user scrolling,
   * or a change has been made in the store.
   * @return Observable of Speech arrays.
   */
  selectAll$(): Observable<Speech[]> {
    return combineLatest([this.selectPage$, this.selectAll()]).pipe(
      map(([page, speeches]) => {
        if (page !== this.lastPage) {
          return this.combineSpeeches(speeches, true, page);
        }

        const slicedSpeeches = speeches.slice(
          0,
          Number(this.lastSpeeches?.length)
        );

        this.lastSpeeches = slicedSpeeches;
        return slicedSpeeches;
      })
    );
  }

  /**
   * Resets the value of the last properties.
   */
  resetLastProperties(): void {
    this.lastKeywords = this.lastPage = this.lastSpeeches = undefined;
  }

  /**
   * Provides an array of speeches that are to be displayed in the UI.
   * The array is built on the combination lastSpeech property and a sliced
   * version from the store based on the current page.
   * @param speeches - active speeches from the store.
   * @param isViewPage - condition for if the current page is for viewing speeches.
   * @param page - current page from the user scroll.
   * @param keywords - keywords from the user input in the search page.
   * @return Observable of speeches array.
   */
  private combineSpeeches(
    speeches: Speech[],
    isViewPage: boolean,
    page: number,
    keywords?: string
  ): Speech[] {
    /**
     * Take 10 speeches from the Speeches array based on the current page.
     */
    const slicedSpeeches = isViewPage
      ? speeches.slice(page * 10, page * 10 + 10)
      : speeches.slice(0, Number(this.lastSpeeches?.length));

    /**
     * If a previous instance of speeches exists combine them with
     * the sliced speeches.
     */
    if (this.lastSpeeches?.length) {
      const combinedSpeeches = [...this.lastSpeeches, ...slicedSpeeches];
      this.setLastProperties(page, combinedSpeeches, keywords);
      return combinedSpeeches;
    }

    this.setLastProperties(page, slicedSpeeches, keywords);
    return slicedSpeeches;
  }

  /**
   * Sets the value of the last properties.
   * @param page - value of lastPage.
   * @param speeches - the last array of speeches.
   * @param keywords - value of last keywords.
   */
  private setLastProperties(
    page: number,
    speeches: Speech[],
    keywords?: string
  ): void {
    this.lastKeywords = keywords;
    this.lastPage = page;
    this.lastSpeeches = speeches;
  }
}
