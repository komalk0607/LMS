

import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseServiceService } from 'src/app/Services/course-service.service';
import { Course } from 'src/app/Modals/CourseModals/course-model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from 'src/app/Services/CommonService/common-service.service';
@Component({
  selector: 'app-course-assignment',
  templateUrl: './course-assignment.component.html',
  styleUrls: ['./course-assignment.component.css']
})
export class CourseAssignmentComponent {
  formSearchGrid!: FormGroup;
  formAssignCourse!: FormGroup;
  assignCourse: boolean = false;

  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  data: any
  data1!: string;
  ediData: any;
  employeeList: any;
  courseList: any;
  editData1: any;
  constructor(private _fb: FormBuilder, private _service: CourseServiceService, private _http: HttpClient,private _commonService:CommonServiceService) {

  }
  ngOnInit(): void {
    this.searchGridForm();
    this.assignCourseForm();
    this.getSearchAndGridData('');
    this.getEmployeeDropDown();
    this.getCoursesDropDown();
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
  get a() {
    return this.formAssignCourse.controls
  }
  searchGridForm() {
    this.formSearchGrid = this._fb.group({
      EMPLOYEE_NAME: [null],
      COURSE_NAME: [null],
      START_TIME: [null],
      END_TIME: [null],
      STATUS: [null],

    })
  }
  assignCourseForm() {
    this.formAssignCourse = this._fb.group({
      COURSE_NAME: [null, Validators.required],
      EMPLOYEE_NAME: [null, Validators.required],
      COMPANY_NAME: [null, Validators.required],
      EVALUATOR_NAME: [null, Validators.required],
      LOCATION: [null, Validators.required],
      START_TIME: [null, Validators.required],
      END_TIME: [null, Validators.required],


    })
  }
  getSearchAndGridData(value: string) {
    debugger
    if (this.formSearchGrid.controls['EMPLOYEE_NAME']?.value == null &&
      this.formSearchGrid.controls['COURSE_NAME']?.value == null &&
      this.formSearchGrid.controls['START_TIME']?.value == null &&
      this.formSearchGrid.controls['END_TIME']?.value == null &&
      this.formSearchGrid.controls['STATUS']?.value == null && value == 'buttonclick'
    ) {
      Swal.fire('Please enter atleast one search field')
    }
    else {
      var obj = new Course();
      obj.OPERATION = "Search_GetGridData";
      obj.EMPLOYEE_NAME = this.formSearchGrid.controls['EMPLOYEE_NAME']?.value ? this.formSearchGrid.controls['EMPLOYEE_NAME']?.value : '';
      obj.COURSE_NAME = this.formSearchGrid.controls['COURSE_NAME']?.value ? this.formSearchGrid.controls['COURSE_NAME']?.value : '';
      obj.START_TIME = this.formSearchGrid.controls['START_TIME']?.value ? this.formSearchGrid.controls['START_TIME']?.value + "T11:02:46.055Z" : '';
      obj.END_TIME = this.formSearchGrid.controls['END_TIME']?.value ? this.formSearchGrid.controls['END_TIME']?.value + "T11:02:46.055Z" : '';
      obj.STATUS = this.formSearchGrid.controls['STATUS']?.value ? this.formSearchGrid.controls['STATUS']?.value : '';
      obj.COURSE_EMPLOYEE_ID = '';
      obj.ASSIGNED_BY = "Komal"
      // obj.CREATED_BY = 'komalk0607'
      this._service.searchGridAssignCourse(obj).subscribe(res => {
        this._commonService.destroyDT()
        this.data = res.Data
        this._commonService.getDT();
        //this.dtTrigger.next(this.data)
      })
    
    }



  }
  clearSearch() {
    debugger
    this._commonService.destroyDT();
    this.getSearchAndGridData('');
    
    this.formSearchGrid.reset();
   
    

  }
  deleteRecord(value: number) {
    debugger
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger mr-4'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it! ',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        var obj = new Course();
        obj.OPERATION = "DEELETE_ASSIGNED_COURSE",
          obj.VALUES = [{
            "COURSE_EMPLOYEE_ID": value
          }]
        this._service.deleteAssignedCourse(obj).subscribe(res => {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your record has been deleted.',
            'success'
          )
          this.getSearchAndGridData('');
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })
  }
  editCourseAssignment(value: number) {
    debugger
    // this.getCoursesDropDown();
    var obj = new Course();
    obj.OPERATION = "Search_GetGridData";
    obj.EMPLOYEE_NAME = '';
    obj.COURSE_NAME = '';
    obj.START_TIME = '';
    obj.END_TIME = '';
    obj.STATUS = '';
    obj.COURSE_EMPLOYEE_ID = value;
    obj.ASSIGNED_BY = "Komal"
    this._service.searchGridAssignCourse(obj).subscribe(res => {
      this.ediData = res.Data
      this.editData1=this.ediData[0]
      
      this.formAssignCourse.patchValue(this.ediData[0])
      this.formAssignCourse.controls['COURSE_NAME']?.setValue(this.ediData[0].COURSE_ID)
      this.formAssignCourse.controls['EMPLOYEE_NAME']?.setValue(this.ediData[0].EMPLOYEE_ID
      )
      this.formAssignCourse.controls['EVALUATOR_NAME']?.setValue(this.ediData[0].EVALUATOR_ID)
      this.formAssignCourse.controls['START_TIME']?.setValue(this.ediData[0].START_TIME.split('T')[0])
      this.formAssignCourse.controls['END_TIME']?.setValue(this.ediData[0].END_TIME.split('T')[0])
    })

  }
  save() {
    debugger
    this.assignCourse = true;
    if (this.formAssignCourse.valid) {
      var obj = new Course();
      obj.OPERATION = "ASSIGN_COURSE",
        obj.VALUES = [{
          "COURSE_EMPLOYEE_ID": this.ediData[0]?.COURSE_EMPLOYEE_ID? this.ediData[0]?.COURSE_EMPLOYEE_ID:"0",
          "COURSE_ID": this.formAssignCourse.controls['COURSE_NAME']?.value,
          "START_TIME": this.formAssignCourse.controls['START_TIME']?.value + "T11:02:46.055Z",
          "END_TIME": this.formAssignCourse.controls['END_TIME']?.value + "T11:02:46.055Z",
          "EMPLOYEE_ID": this.formAssignCourse.controls['EMPLOYEE_NAME']?.value,
          "EVALUATOR_ID": this.formAssignCourse.controls['EVALUATOR_NAME']?.value,
          "ASSIGNED_BY": "Komal"
        }]
      this._service.assignCourse(obj).subscribe(res => {
        if (res.ResponseCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Course has been assigned successfully',
            showConfirmButton: false,
            timer: 2000
          })
          this.getSearchAndGridData('');
        }
      })
      console.log(obj)
      const btn = document.getElementById('save') as HTMLButtonElement;
      btn.click();
    }

  }
  searchEmployee(e: Event) {
    debugger
    this.data1 = 'aaaaaaaaa'
  }
  closeCanvas() {
    this.assignCourse = false;
    this.formAssignCourse.reset();
    this.ediData = [];
  }
  getEmployeeDropDown() {
    var obj = new Course();
    obj.STR = "BUSINESS_DETAILS"
    this._service.getEmployeeDropDown(obj).subscribe(res => {
      this.employeeList = res.Data;

    })
  }
  getCoursesDropDown() {
    var obj = new Course();
    obj.STR = "GET_COURSES_DROPDOWN"
    this._service.getCoursesDropDown(obj).subscribe(res => {
      this.courseList = res.Data;

    })
  }
  changeEmployee() {

    const a = this.employeeList?.find((x: { EMPLOYEE_ID: any; }) => x.EMPLOYEE_ID == this.formAssignCourse.controls['EMPLOYEE_NAME']?.value)
    this.formAssignCourse.controls['COMPANY_NAME']?.setValue(a?.COMPANY_NAME);
    this.formAssignCourse.controls['LOCATION']?.setValue(a?.LOCATION)
  }
  changeCourseName() {
    const a = this.courseList?.find((x: { COURSE_ID: any; }) => x.COURSE_ID == this.formAssignCourse.controls['COURSE_NAME']?.value)
    this.formAssignCourse.controls['COURSE_NAME']?.setValue(a?.COURSE_ID);
  }
  checkDate(){
    debugger
    if(this.formAssignCourse.controls['START_TIME']?.value >this.formAssignCourse.controls['END_TIME']?.value){
      this.formAssignCourse.controls['START_TIME']?.setErrors({'invalidstartdate': true})
      this.formAssignCourse.controls['END_TIME']?.setErrors({'invalidstartdate': true})
      //this.formAssignCourse.controls['START_TIME']?.updateValueAndValidity()
    }
    else {
      this.formAssignCourse.controls['START_TIME']?.setErrors(null)
    }
  }
}
