import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { CourseServiceService } from 'src/app/Services/course-service.service';
import { Course } from 'src/app/Modals/CourseModals/course-model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css']
})
export class CourseUploadComponent implements OnInit {

  @ViewChild("addModule") addModule: any;


  formAddCourse!: FormGroup;
  formAddModule!: FormGroup;
  formSearchGrid!: FormGroup;
  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  formGlag: boolean = false;
  data: any;
  editData: any;
  arryAddModule: any = [];
  flag: boolean = false;
  arrmoduleValues: any = [];
  fileToUpload: any = [];
  arrfileData: any;
  index: any;
  courseSubmitted: boolean = false;
  moduleSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private modalservice: NgbModal, private service: CourseServiceService, private http: HttpClient) {

  }
  ngOnInit(): void {
    sessionStorage.removeItem('courseDetails');
    sessionStorage.removeItem('SingleModuleData');

    this.getGridData();
    this.dtoptions = {
      pagingType: 'full_numbers',
    }
    this.searchGridForm();
    this.addCourseForm();
    this.addModuleForm();
  }
  get c() {

    return this.formAddCourse.controls;
  }
  get m() {
    return this.formAddModule.controls;
  }
  searchGridForm() {
    this.formSearchGrid = this.fb.group({
      COURSE_NAME: [null],
      NO_OF_MODULES: [null],
      CATEGORY: [null],
      SUB_CATEGORY: [null],
      LEVEL_OF_COURSE: [null],

    })
  }
  addCourseForm() {
    this.formAddCourse = this.fb.group({
      COURSE_NAME: [null, [Validators.required]],
      NO_OF_MODULES: [null, [Validators.required]],
      CATEGORY: [null, [Validators.required]],
      SUB_CATEGORY: [null, [Validators.required]],
      LEVEL_OF_COURSE: [null, [Validators.required]],
      INSTRUCTOR_NAME: [null, [Validators.required]],
      COURSE_OUTCOME: [null, [Validators.required]],
      // whoCanAttend: [null, [Validators.required]],
      COURSE_DESCRIPTION: [null, [Validators.required]],

    })
  }
  addModuleForm() {
    this.formAddModule = this.fb.group({
      COURSE_NAME: [null],
      MODULE_NAME: [null, [Validators.required]],
      MODULE_NUMBER: [null, [Validators.required]],
      MODULE_DESCRIPTION: [null, [Validators.required]],
      MODULE_DURATION: [null, [Validators.required]],
      THUMBNAIL_PATH: [null],
      VIDEO_PATH: [null],
    })
  }
  getGridData() {
    debugger

    var obj = new Course();
    obj.CREATED_BY = 'komalk0607';
    this.service.getCourseGridData(obj).subscribe(res => {
      this.data = res.Data;
      debugger
    })
  }
  submitCourse() {
    debugger

    if (this.formAddCourse.invalid) {
      this.formGlag = true
    }
    else {
      // alert(JSON.stringify(this.formAddCourse.value))
      var obj = {
        "COURSE_NAME": this.formAddCourse.controls['COURSE_NAME'].value,
        "USER_ID": 'komalk0607',
        "COURSE_DESCRIPTION": this.formAddCourse.controls['COURSE_DESCRIPTION'].value,
        "NO_OF_MODULES": this.formAddCourse.controls['NO_OF_MODULES'].value,
        "CATEGORY": this.formAddCourse.controls['CATEGORY'].value,
        "SUB_CATEGORY": this.formAddCourse.controls['SUB_CATEGORY'].value,
        "LEVEL_OF_COURSE": this.formAddCourse.controls['LEVEL_OF_COURSE'].value,
        "INSTRUCTOR_NAME": this.formAddCourse.controls['INSTRUCTOR_NAME'].value,
        "COURSE_OUTCOME": this.formAddCourse.controls['COURSE_OUTCOME'].value,
        "CREATED_BY": 'komalk0607',
        "CREATED_DATE": '2023-08-07T11:02:46.055Z',
        "UPDATED_BY": 'string',
        "UPDATED_DATE": '2023-08-07T11:02:46.055Z',

        "MODULES": [

        ]
      }
      this.service.insertCourseData(obj).subscribe(res => {
        debugger
        if (res.ResponseCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Your course has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.getGridData();
        }

      })
      // this.addModule.nativeElement.click()
    }

  }
  submitModule() {
    debugger
    this.courseSubmitted = true;
    this.moduleSubmitted = false;
    if (this.formAddCourse.valid) {
      this.formAddModule.controls['COURSE_NAME'].setValue(this.formAddCourse.controls['COURSE_NAME']?.value);
      if (this.editData?.MODULE) {
        for (let i = 0; i <= this.editData.MODULE.length - 1; i++) {
          this.arryAddModule.push(this.editData.MODULE[i]);
        }
      }
      else {

      }
      this.addModule.nativeElement.click()
    }
  }
  addButton() {
    debugger
    this.moduleSubmitted = true;
    const singleModuleData = JSON.parse(`${sessionStorage.getItem("SingleModuleData")}`)
    if (this.formAddModule.valid) {
      if (singleModuleData) {
        this.arryAddModule.splice(this.index, 1)
        const ADDMODULEDATA = {
          "MODULE_ID": singleModuleData.MODULE_ID,
          "MODULE_NAME": this.formAddModule.controls['MODULE_NAME']?.value,
          "MODULE_NUMBER": this.formAddModule.controls['MODULE_NUMBER']?.value,
          "MODULE_DURATION": this.formAddModule.controls['MODULE_DURATION']?.value,
          "MODULE_DESCRIPTION": this.formAddModule.controls['MODULE_DESCRIPTION']?.value,
          "THUMBNAIL_PATH": this.formAddModule.controls['THUMBNAIL_PATH']?.value,
          "VIDEO_PATH": this.formAddModule.controls['VIDEO_PATH']?.value,
        }
        this.arryAddModule.push(ADDMODULEDATA);
        sessionStorage.removeItem('SingleModuleData');
        this.formAddModule.reset();
      }
      else {
        this.arryAddModule.slice(this.index, 1)
        const ADDMODULEDATA = {
          "MODULE_NAME": this.formAddModule.controls['MODULE_NAME']?.value,
          "MODULE_NUMBER": this.formAddModule.controls['MODULE_NUMBER']?.value,
          "MODULE_DURATION": this.formAddModule.controls['MODULE_DURATION']?.value,
          "MODULE_DESCRIPTION": this.formAddModule.controls['MODULE_DESCRIPTION']?.value,
          "THUMBNAIL_PATH": this.formAddModule.controls['THUMBNAIL_PATH']?.value,
          "VIDEO_PATH": this.formAddModule.controls['VIDEO_PATH']?.value,
        }
        this.arryAddModule.push(ADDMODULEDATA);
        this.formAddModule.reset();
      }

    }

  }
  saveButton() {
    debugger

    if (this.arryAddModule.length == 0) {
      Swal.fire('Add atleast one module')
    }
    else {
      var obj = {
        "COURSE_NAME": this.formAddCourse.controls['COURSE_NAME'].value,
        "COURSE_DESCRIPTION": this.formAddCourse.controls['COURSE_DESCRIPTION'].value,
        "NO_OF_MODULES": this.formAddCourse.controls['NO_OF_MODULES'].value,
        "CATEGORY": this.formAddCourse.controls['CATEGORY'].value,
        "SUB_CATEGORY": this.formAddCourse.controls['SUB_CATEGORY'].value,
        "LEVEL_OF_COURSE": this.formAddCourse.controls['LEVEL_OF_COURSE'].value,
        "INSTRUCTOR_NAME": this.formAddCourse.controls['INSTRUCTOR_NAME'].value,
        "COURSE_OUTCOME": this.formAddCourse.controls['COURSE_OUTCOME'].value,
        "CREATED_BY": 'komalk0607',
        "CREATED_DATE": '2023-08-07T11:02:46.055Z',
        "UPDATED_BY": 'string',
        "UPDATED_DATE": '2023-08-07T11:02:46.055Z',

        "MODULE": this.arryAddModule,
      }
      console.log(obj)
      this.service.insertCourseData(obj).subscribe(res => {
        if (res.ResponseCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Your course has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.getGridData();
        }
      })
    }


  }
  setThumbnail(e: any) {
    debugger
    const fThumbnail = document.getElementById('THUMBNAIL_PATH') as HTMLInputElement
    if (fThumbnail) {
      fThumbnail.click();
    }



  }
  upload(event: any) {
    const formData: FormData = new FormData();
    this.fileToUpload = event.target.files[0] as File;
    formData.append('file', this.fileToUpload, this.fileToUpload.name)
    var obj = new Course();
    obj.COURSE_ID = 37;
    obj.file = formData;
    this.service.uploadFiles(obj).subscribe(res => {
      debugger
    })

    debugger
  }
  deleteCourse(item: number) {
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
    }).then((result) => {
      if (result.isConfirmed) {
        var obj = new Course();
        obj.COURSE_ID = item;
        this.service.deleteCourseById(obj).subscribe(res => {
          debugger
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your record has been deleted.',
            'success'
          )
          this.getGridData();
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
  editCourseById(item: number) {
    debugger
    this.arryAddModule = [];
    var obj = new Course();
    obj.COURSE_ID = item;
    this.service.getCourseById(obj).subscribe(res => {
      debugger
      this.editData = res.Data;
      this.formAddCourse.patchValue(this.editData);
      sessionStorage.setItem('courseAndModuleDetails', JSON.stringify(this.editData));
      var obj1 = new Course();
      obj1.COURSE_ID = this.editData.COURSE_ID
      this.service.getFileById(obj).subscribe(res => {
        debugger
        this.arrfileData = res.data;
      })

    })
  }
  editModule(value: any) {
    debugger
    const courseAndModuleDetails = JSON.parse(`${sessionStorage.getItem("courseAndModuleDetails")}`)

    this.index = courseAndModuleDetails.MODULE.findIndex((i: { MODULE_NUMBER: Number; }) => i.MODULE_NUMBER === value.MODULE_NUMBER);
    this.formAddModule.patchValue(value);
    sessionStorage.setItem('SingleModuleData', JSON.stringify(value));
  }
  searchGrid() {
    debugger
    if (this.formSearchGrid.controls['COURSE_NAME']?.value == null &&
      this.formSearchGrid.controls['NO_OF_MODULES']?.value == null &&
      this.formSearchGrid.controls['CATEGORY']?.value == null &&
      this.formSearchGrid.controls['SUB_CATEGORY']?.value == null &&
      this.formSearchGrid.controls['LEVEL_OF_COURSE']?.value == null
    ) {
      Swal.fire('Please enter atleast one search field')
    }
    else {
      var obj = new Course();
      obj.COURSE_NAME = this.formSearchGrid.controls['COURSE_NAME']?.value ? this.formSearchGrid.controls['COURSE_NAME']?.value : '';
      obj.NO_OF_MODULES = this.formSearchGrid.controls['NO_OF_MODULES']?.value ? this.formSearchGrid.controls['NO_OF_MODULES']?.value : '';
      obj.CATEGORY = this.formSearchGrid.controls['CATEGORY']?.value ? this.formSearchGrid.controls['CATEGORY']?.value : '';
      obj.SUB_CATEGORY = this.formSearchGrid.controls['SUB_CATEGORY']?.value ? this.formSearchGrid.controls['SUB_CATEGORY']?.value : '';
      obj.LEVEL_OF_COURSE = this.formSearchGrid.controls['LEVEL_OF_COURSE']?.value ? this.formSearchGrid.controls['LEVEL_OF_COURSE']?.value : '';
      obj.CREATED_BY = 'komalk0607'
      this.service.searchGrid(obj).subscribe(res => {
        this.data = res.Data
      })
    }

  }
  clearSearch() {
    this.getGridData();
    this.formSearchGrid.reset();
  }

  closeCanvas() {
    debugger
    this.formAddCourse.reset();
    this.formAddModule.reset();
    this.arryAddModule = [];
    this.editData = [];
    sessionStorage.removeItem('courseDetails');
  }
}
