import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ViewSpeechComponent } from './pages/view-speech/view-speech.component';
import { SearchSpeechComponent } from './pages/search-speech/search-speech.component';
import { AddSpeechComponent } from './pages/add-speech/add-speech.component';
import { SharedModule } from '../shared/shared.module';
import { SpeechFormComponent } from './components/speech-form/speech-form.component';
import { SpeechDetailsComponent } from './pages/speech-details/speech-details.component';
import { SpeechListComponent } from './pages/speech-list/speech-list.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ViewSpeechComponent,
    AddSpeechComponent,
    SearchSpeechComponent,
    SpeechListComponent,
    SpeechFormComponent,
    SpeechDetailsComponent,
  ],
  imports: [ProjectRoutingModule, SharedModule],
})
export class ProjectModule {}
