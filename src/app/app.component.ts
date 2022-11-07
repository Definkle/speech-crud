import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectConst } from './project/config/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = ProjectConst.PageTitle;
}
