import { Component, OnInit } from '@angular/core';
import { Speech } from '../../state/speech.model';
import { Observable } from 'rxjs';
import { SpeechQuery } from '../../state/speech.query';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

@Component({
  selector: 'app-view-speech',
  templateUrl: './view-speech.component.html',
  styleUrls: ['./view-speech.component.scss']
})
export class ViewSpeechComponent implements OnInit {

  generalTexts = GeneralTexts;
  speeches$?: Observable<Speech[]>;

  constructor(private speechQuery: SpeechQuery) {
  }

  ngOnInit(): void {
    this.speeches$ = this.speechQuery.selectSpeechesUI$;
  }
}
