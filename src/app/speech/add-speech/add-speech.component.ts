import { Component } from '@angular/core';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

@Component({
  selector: 'app-add-speech',
  templateUrl: './add-speech.component.html',
  styleUrls: ['./add-speech.component.scss'],
})
export class AddSpeechComponent {
  readonly generalTexts = GeneralTexts;
}
