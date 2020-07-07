import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsModule } from './students.module';
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';


const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: '',
        component: StudentsListComponent
      },
      {
        path: 'profile',
        component: StudentEditComponent
      },
      {
        path: 'profile/:id',
        component: StudentEditComponent
      }
    ]
  }
  ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
