import { SpeechService } from '../../state/speech.service';
import { Resolve } from '@angular/router';
import { Speech } from '../../state/speech.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpeechQuery } from 'src/app/state/speech.query';

@Injectable({ providedIn: 'root' })
export class SpeechResolver implements Resolve<Observable<Speech[]>> {

  constructor(private speechService: SpeechService, private speechQuery: SpeechQuery) {
  }

  resolve(): Observable<Speech[]> {
    const speeches = this.speechQuery.getAll();
    if (speeches.length) {
      return of(speeches);
    }
    return this.speechService.loadSpeeches();
  }
}

