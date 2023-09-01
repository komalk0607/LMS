

import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseServiceService } from 'src/app/Services/course-service.service';
import { Course } from 'src/app/Modals/CourseModals/course-model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-course-assignment',
  templateUrl: './course-assignment.component.html',
  styleUrls: ['./course-assignment.component.css']
})
export class CourseAssignmentComponent {
  formSearchGrid!: FormGroup;
  formAssignCourse!: FormGroup;
  assignCourse:boolean=false;
  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

   data=[{
      "EMPLOYEE_NAME":"Komal",
      "COURSE_NAME":"Web Design",
      "START_DATE":"30-08-2023",
      "ATTEMPT":"01",
      "END_DATE":"01-10-2023",
      "STATUS":"Active",
    
    },{
      "EMPLOYEE_NAME":"Sid",
      "COURSE_NAME":"Api",
      "START_DATE":"01-09-2023",
      "ATTEMPT":"02",
      "END_DATE":"01-10-2023",
      "STATUS":"Active",
    },{
      "EMPLOYEE_NAME":"Aditya",
      "COURSE_NAME":"Api-1",
      "START_DATE":"31-08-2023",
      "ATTEMPT":"03",
      "END_DATE":"02-10-2023",
      "STATUS":"Active",
    }];
  constructor(private _fb: FormBuilder, private _service: CourseServiceService, private _http: HttpClient){

  }
  ngOnInit(): void {
    this.searchGridForm();
    this.assignCourseForm();
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      order: [],
      columnDefs: [{
        'targets': [0], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
      }],
    }
  }
  get a(){
    return this.formAssignCourse.controls
  }
  searchGridForm() {
    this.formSearchGrid = this._fb.group({
      EMPLOYEE_NAME: [null],
      COURSE_NAME: [null],
      START_DATE: [null],
      END_DATE: [null],
      STATUS: [null],

    })
  }
  assignCourseForm() {
    this.formAssignCourse = this._fb.group({
      COURSE_NAME: [null,Validators.required],
      EMPLOYEE_NAME: [null,Validators.required],
      COMPANY_NAME: [null,Validators.required],
      BRANCH: [null,Validators.required],
      START_DATE: [null,Validators.required],
      END_DATE: [null,Validators.required],


    })
  }
  searchGrid() {
    debugger
    if (this.formSearchGrid.controls['COURSE_NAME']?.value == null &&
      this.formSearchGrid.controls['NO_OF_MODULES']?.value == null &&
      this.formSearchGrid.controls['CATEGORY']?.value == null &&
      this.formSearchGrid.controls['APPROVER']?.value == null &&
      this.formSearchGrid.controls['LEVEL_OF_COURSE']?.value == null
    ) {
      Swal.fire('Please enter atleast one search field')
    }
    else {
      var obj = new Course();
      obj.COURSE_NAME = this.formSearchGrid.controls['COURSE_NAME']?.value ? this.formSearchGrid.controls['COURSE_NAME']?.value : '';
      obj.NO_OF_MODULES = this.formSearchGrid.controls['NO_OF_MODULES']?.value ? this.formSearchGrid.controls['NO_OF_MODULES']?.value : '';
      obj.CATEGORY = this.formSearchGrid.controls['CATEGORY']?.value ? this.formSearchGrid.controls['CATEGORY']?.value : '';
      obj.APPROVER = this.formSearchGrid.controls['APPROVER']?.value ? this.formSearchGrid.controls['APPROVER']?.value : '';
      obj.LEVEL_OF_COURSE = this.formSearchGrid.controls['LEVEL_OF_COURSE']?.value ? this.formSearchGrid.controls['LEVEL_OF_COURSE']?.value : '';
      obj.CREATED_BY = 'komalk0607'
      this._service.searchGrid(obj).subscribe(res => {
        // this.data = res.Data
      })
    }
   


  }
  clearSearch() {
    //this.getGridData();
    this.formSearchGrid.reset();
  }
  save(){
    this.assignCourse=true;
    if(this.formAssignCourse.valid){
      const btn = document.getElementById('save') as HTMLButtonElement;
      btn.click();
    }
    
  }
}
