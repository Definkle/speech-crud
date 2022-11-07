import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Speech } from './speech.model';
import { Observable, tap } from 'rxjs';
import { SpeechStore } from './speech.store';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  constructor(private http: HttpClient, private store: SpeechStore) {}

  loadSpeeches(): Observable<Speech[]> {
    return this.http
      .get<Speech[]>('assets/data.json')
      .pipe(tap((speeches) => this.store.set(speeches)));
  }

  addSpeech(speech: Speech): void {
    const newSpeech = new Speech(speech);
    this.store.add(newSpeech);
  }

  clearActive(): void {
    this.store.setActive(null);
  }

  deleteSpeech(speechId: string): void {
    this.clearActive();
    this.store.remove(speechId);
  }

  resetUi(): void {
    this.store.resetUi();
  }

  setActive(speech: Speech): void {
    this.store.setActive(speech.id);
  }

  updateSpeech(speech: Speech): void {
    this.store.update(speech.id, speech);
  }

  updatePage(page: number): void {
    this.store.update({ ui: { page } });
  }
}
