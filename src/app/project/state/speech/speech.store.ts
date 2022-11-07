import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { Speech } from './speech.model';

export interface SpeechState extends EntityState<Speech>, ActiveState {
  ui: {
    page: number;
  };
}

const initialState = {
  ui: {
    page: 0,
  },
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'speech', resettable: true })
export class SpeechStore extends EntityStore<SpeechState> {
  constructor() {
    super(initialState);
    this.createUIStore();
  }

  resetUi(): void {
    this.update(initialState);
  }
}
