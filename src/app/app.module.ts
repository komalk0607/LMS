import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DataTablesModule} from 'angular-datatables'
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingPageModule,
    FontAwesomeModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
