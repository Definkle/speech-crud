import { Component } from '@angular/core';
import { ProjectConst } from './config/const';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  readonly projectConst = ProjectConst;
}
