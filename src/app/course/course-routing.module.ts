import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseUploadComponent } from './course-upload/course-upload.component';
import { CourseDisplayComponent } from './course-display/course-display.component';
import { FacultyDashboardComponent } from './faculty-dashboard/faculty-dashboard.component';
import { CourseAssignmentComponent } from './course-assignment/course-assignment.component';

const routes: Routes = [
  {
  path:'course-upload',
  component:CourseUploadComponent
}, {
  path:'course-display',
  component:CourseDisplayComponent
},{
  path:'faculty-dashboard',
  component:FacultyDashboardComponent
},
{
  path:'course-assignment',
  component:CourseAssignmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
