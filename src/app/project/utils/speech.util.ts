import { guid } from '@datorama/akita';
import { Speech } from '../state/speech/speech.model';

export class SpeechUtil {
  static hasSearchResults(searchString: string, speech: Speech): boolean {
    const lowerCaseKeywords = searchString.toLowerCase();

    return (
      speech.keywords!.toLowerCase().includes(lowerCaseKeywords) ||
      speech.author!.toLowerCase().includes(lowerCaseKeywords)
    );
  }

  static getRandomId(): string {
    return guid();
  }
}
