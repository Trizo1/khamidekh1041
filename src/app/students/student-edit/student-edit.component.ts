import { Component, OnInit } from '@angular/core';
import { Student, StudentSection, GroupSection } from 'src/app/shared/models/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/shared/services/student.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  id: number;
  student: Student;
  studentSection = StudentSection;
  groupSection = GroupSection;
  studentForm: FormGroup;
  phoneMask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  constructor(private activateRoute: ActivatedRoute, private studentService: StudentService, private router: Router) {
    this.activateRoute.params.subscribe((params) => {
      if (!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    });
  }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      date: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let student = this.studentService.getOneById(this.id);
        this.student = await student;
      } catch (err) {
        console.log(err);
      }
      console.log(this.student.section);
      this.studentForm.patchValue({
        name: this.student.name,
        surname: this.student.surname,
        patronymic: this.student.patronymic,
        phone: this.student.phone,
        email: this.student.email,
        date: this.student.date,
        group: this.student.group,
        section: this.student.section,
      });
    }
  }

  async onDelete() {
    try {
      await this.studentService.deleteOneById(this.id);
    } catch (err) {
      console.log(err);
    }
    this.router.navigate(['/students']);
  }

  async onSave() {
    let data = this.studentForm.value;
    data.phone = data.phone.replace(/\D/g, '');
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.studentService.putOne(this.id, data);
        this.router.navigate(['/students']);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await this.studentService.postOne(data);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.log(err);
      }
    }
  }

}
