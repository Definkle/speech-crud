import { Component } from '@angular/core';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

@Component({
  selector: 'app-view-speech',
  templateUrl: './view-speech.component.html',
  styleUrls: ['./view-speech.component.scss'],
})
export class ViewSpeechComponent {
  readonly generalTexts = GeneralTexts;
}
