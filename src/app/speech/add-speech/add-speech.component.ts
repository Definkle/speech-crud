import { Component } from '@angular/core';
import { SpeechQuery } from 'src/app/state/speech.query';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

@Component({
  selector: 'app-add-speech',
  templateUrl: './add-speech.component.html',
  styleUrls: ['./add-speech.component.scss']
})
export class AddSpeechComponent {
  generalTexts = GeneralTexts;
  constructor(private speechQuery: SpeechQuery) { }
}
