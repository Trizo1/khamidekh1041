import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [StudentsListComponent, StudentEditComponent, StudentsComponent, SearchPipe],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule
  ]
})
export class StudentsModule { }
