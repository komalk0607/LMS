import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseAssignmentComponent } from './course-assignment/course-assignment.component';
import { CourseUploadComponent } from './course-upload/course-upload.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CourseAssignmentComponent,
    CourseUploadComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    DataTablesModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CourseModule { }
