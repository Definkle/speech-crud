import { Component } from '@angular/core';
import { GeneralTexts } from './shared/enums/general-texts.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'speech-crud';
  readonly generalTexts = GeneralTexts;
}
