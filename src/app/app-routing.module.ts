import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './landing-page/home-page/home-page.component';
import { CourseUploadComponent } from './course/course-upload/course-upload.component';
import { CourseDisplayComponent } from './course/course-display/course-display.component';


const routes: Routes = [
{
  path:'landing-page' ,
  component:HomePageComponent,
  loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
},
{
  path:'course' ,
  loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
},
{
  path: '',
  redirectTo: '/landing-page',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
