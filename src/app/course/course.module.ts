import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseAssignmentComponent } from './course-assignment/course-assignment.component';
import { CourseUploadComponent } from './course-upload/course-upload.component';


@NgModule({
  declarations: [
    CourseAssignmentComponent,
    CourseUploadComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
