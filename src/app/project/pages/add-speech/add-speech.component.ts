import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectConst } from '../../config/const';

@Component({
  selector: 'app-add-speech-list',
  templateUrl: './add-speech.component.html',
  styleUrls: ['./add-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSpeechComponent {
  readonly projectConst = ProjectConst;
}
