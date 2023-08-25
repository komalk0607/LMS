import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseUploadComponent } from './course-upload/course-upload.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CourseDisplayComponent } from './course-display/course-display.component';


@NgModule({
  declarations: [
    CourseUploadComponent,
    SideBarComponent,
    CourseDisplayComponent,
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
