import { Pipe, PipeTransform } from '@angular/core';
import { StudentSection } from 'src/app/shared/models/student.model';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(students: any[], searchStr: string): any[] {
    if (isNullOrUndefined(searchStr)) {
      return students;
    } else {
      let array = searchStr.trim().split(' ');
      if (array.length == 1) {
        return students.filter((student) => {
          return student.group.toLowerCase().includes(array[0].toLowerCase()) || student.section.toLowerCase().includes(array[0].toLowerCase());
        });
      }
    }
  }
}
