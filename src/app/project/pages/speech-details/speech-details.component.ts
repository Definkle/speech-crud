import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Speech } from '../../state/speech/speech.model';

@Component({
  selector: 'app-speech-details',
  templateUrl: './speech-details.component.html',
  styleUrls: ['./speech-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechDetailsComponent {
  @Input() speech!: Speech;
  @Input() index!: number;
  @Input() activeSpeechId: string | null | undefined;
}
