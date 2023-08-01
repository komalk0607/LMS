import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './landing-page/home-page/home-page.component';


const routes: Routes = [
{
  path:'landing-page' ,
  component:HomePageComponent,
  loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
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
