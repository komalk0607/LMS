import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseUploadComponent } from './course-upload/course-upload.component';

const routes: Routes = [
  {
  path:'course-upload',
  component:CourseUploadComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
