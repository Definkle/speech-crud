import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectConst } from './project/config/const';

const routes: Routes = [
  {
    path: ProjectConst.Projects,
    loadChildren: async () =>
      (await import('./project/project.module')).ProjectModule,
  },
  {
    path: '',
    redirectTo: ProjectConst.Projects,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
