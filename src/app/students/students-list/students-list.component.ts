import { Component, OnInit } from '@angular/core';
import { Student, StudentSection } from 'src/app/shared/models/student.model';
import { isNullOrUndefined } from 'util';
import { StudentService } from 'src/app/shared/services/student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Student[] = [];
  searchStr: string;
  isDataLoaded: boolean = false;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.getData().then(() => {
      this.isDataLoaded = true;
    });
  }

  getStudentInitials(student: Student): string {
    let surname = student.surname;
    let initials = student.name[0].toUpperCase() + '.' + student.patronymic[0].toUpperCase() + '.';
    return surname + ' ' + initials;
  }


  async getData() {
    try {
      let students = this.studentService.getAll();
      this.students = isNullOrUndefined(students) ? [] : (await students).sort((a, b) => a.surname > b.surname ? 1 : -1);
    }
    catch (err) {
      console.log(err);
    }
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onEditProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async onDelete(id: number) {
    try {
      await this.studentService.deleteOneById(id);
    } catch (err) {
      console.log(err);
    }
    this.getData();
  }

}
