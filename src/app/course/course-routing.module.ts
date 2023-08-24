import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseUploadComponent } from './course-upload/course-upload.component';
import { CourseDisplayComponent } from './course-display/course-display.component';

const routes: Routes = [
  {
  path:'course-upload',
  component:CourseUploadComponent
}, {
  path:'course-display',
  component:CourseDisplayComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
