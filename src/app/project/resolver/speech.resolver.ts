import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Speech } from '../state/speech/speech.model';
import { SpeechService } from '../state/speech/speech.service';
import { SpeechQuery } from 'src/app/project/state/speech/speech.query';

@Injectable({ providedIn: 'root' })
export class SpeechResolver implements Resolve<Observable<Speech[]>> {
  constructor(
    private speechService: SpeechService,
    private speechQuery: SpeechQuery
  ) {}

  resolve(): Observable<Speech[]> {
    const speeches = this.speechQuery.getAll();

    if (speeches.length) {
      return of(speeches);
    }

    return this.speechService.loadSpeeches();
  }
}
