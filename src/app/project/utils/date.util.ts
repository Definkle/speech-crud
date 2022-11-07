import { formatDate } from '@angular/common';
import { ProjectConst } from '../config/const';

export class DateUtil {
  static format(date: string): string {
    return formatDate(date, ProjectConst.DateFormat, ProjectConst.Locale);
  }
}
