import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, EntityUIStore, StoreConfig } from '@datorama/akita';
import { Speech } from './speech.model';


export interface SpeechState extends EntityState<Speech>, ActiveState {
  ui: {
    speeches: Speech[],
  };
}

const initialState = {
  ui: {
    speeches: []
  }
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'speech', resettable: true })
export class SpeechStore extends EntityStore<SpeechState> {

  constructor() {
    super(initialState);
    this.createUIStore();
  }

  updateUiSpeeches(speeches: Speech[]): void {
    const updatedUi = [...this.getValue().ui.speeches, ...speeches];
    this.update({ ui: { speeches: updatedUi } });
  }

  resetUi(): void {
    this.update(initialState);
  }
}
