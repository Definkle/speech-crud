import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSpeechComponent } from './view-speech/view-speech.component';
import { AddSpeechComponent } from './add-speech/add-speech.component';
import { SearchSpeechComponent } from './search-speech/search-speech.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeechFormComponent } from './speech-form/speech-form.component';
import { SpeechComponent } from './speech/speech.component';


@NgModule({
  declarations: [
    ViewSpeechComponent,
    AddSpeechComponent,
    SearchSpeechComponent,
    SpeechFormComponent,
    SpeechComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ]
})
export class SpeechModule { }
