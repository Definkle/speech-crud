import { guid } from '@datorama/akita';

export class Speech {
  id!: string;
  speech?: string;
  author?: string;
  keywords?: string;
  date!: string;

  constructor(init?: Partial<Speech>) {
    Object.assign(this, { ...init, id: guid() });
  }
}
