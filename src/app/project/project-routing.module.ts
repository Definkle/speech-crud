import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { SpeechResolver } from './resolver/speech.resolver';
import { ViewSpeechComponent } from './pages/view-speech/view-speech.component';
import { AddSpeechComponent } from './pages/add-speech/add-speech.component';
import { SearchSpeechComponent } from './pages/search-speech/search-speech.component';
import { ProjectConst } from './config/const';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: ProjectConst.View,
        component: ViewSpeechComponent,
        resolve: [SpeechResolver],
      },
      {
        path: ProjectConst.Add,
        component: AddSpeechComponent,
        resolve: [SpeechResolver],
      },
      {
        path: ProjectConst.Search,
        component: SearchSpeechComponent,
        resolve: [SpeechResolver],
      },
      { path: '', redirectTo: ProjectConst.View, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
