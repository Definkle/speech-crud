import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectConst } from '../../config/const';

@Component({
  selector: 'app-view-speech-list',
  templateUrl: './view-speech.component.html',
  styleUrls: ['./view-speech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSpeechComponent {
  readonly projectConst = ProjectConst;
}
