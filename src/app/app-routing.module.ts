import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralTexts } from './shared/enums/general-texts.enum';
import { ViewSpeechComponent } from './speech/view-speech/view-speech.component';
import { AddSpeechComponent } from './speech/add-speech/add-speech.component';
import { SearchSpeechComponent } from './speech/search-speech/search-speech.component';
import { SpeechResolver } from './shared/resolver/speech.resolver';

const routes: Routes = [
  { path: '', redirectTo: GeneralTexts.VIEW, pathMatch: 'full' },
  {
    path: GeneralTexts.VIEW,
    component: ViewSpeechComponent,
    resolve: [SpeechResolver],
  },
  {
    path: GeneralTexts.ADD,
    component: AddSpeechComponent,
    resolve: [SpeechResolver],
  },
  {
    path: GeneralTexts.SEARCH,
    component: SearchSpeechComponent,
    resolve: [SpeechResolver],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
