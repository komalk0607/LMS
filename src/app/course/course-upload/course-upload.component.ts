import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormArray, Form } from '@angular/forms'
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { CourseServiceService } from 'src/app/Services/course-service.service';
import { Course } from 'src/app/Modals/CourseModals/course-model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormatWidth } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css']
})
export class CourseUploadComponent implements OnInit {

  @ViewChild("addModule") addModule: any;
  @ViewChild("addquiz") addquiz: any;

  formData = new FormData()
  formAddCourse!: FormGroup;
  formAddModule!: FormGroup;
  formSearchGrid!: FormGroup;
  formQuizGroup!: FormGroup;
  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  formGlag: boolean = false;
  // data=[{
  //   "COURSE_ID":1,
  //   "COURSE_NAME":"Api",
  //   "NO_OF_MODULES":"2",
  //   "CATEGORY":"test",
  //   "SUB_CATEGORY":"test",
  //   "LEVEL_OF_COURSE":"advance",
  // },{
  //   "COURSE_ID":1,
  //   "COURSE_NAME":"springboot",
  //   "NO_OF_MODULES":"2",
  //   "CATEGORY":"test",
  //   "SUB_CATEGORY":"test",
  //   "LEVEL_OF_COURSE":"advance",
  // },{
  //   "COURSE_ID":1,
  //   "COURSE_NAME":"Api",
  //   "NO_OF_MODULES":"2",
  //   "CATEGORY":"test",
  //   "SUB_CATEGORY":"test",
  //   "LEVEL_OF_COURSE":"advance",
  // }];
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
  thumbnailData: FormData = new FormData();
  videoData: FormData = new FormData();
  // formData: FormData = new FormData();
  imageSrc: any;
  videoSrc: any;
  videoToUpload: any = [];

  formQuizOption!: FormGroup
  formArrayQuiz!: FormArray;
  optionsform!: FormGroup;
  files: File[] = [];
  files1: File[] = [];
  arrayfilesDelete: any = [];
  sequenceNo: number = 1;
  flagg: boolean = false;
  containers: any = [];
  fileData: Array<any>=[];

  constructor(private _fb: FormBuilder, private _modalservice: NgbModal, private _service: CourseServiceService, private _http: HttpClient) {
    this.formArrayQuiz = this._fb.array([])
  }
  ngOnInit(): void {
    // this.dtTrigger.next('');
    sessionStorage.removeItem('courseDetails');
    sessionStorage.removeItem('SingleModuleData');

    this.getGridData();

    // $(document).ready( function() {

    //    $( '.bg-head' ).DataTable().destroy();

    //   $( '.bg-head' ).DataTable( {
    //     destroy: true,
    //     searching: false,
    //        "ordering": false
    //   } );
    // } );

    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      order: [],
      columnDefs: [{
        'targets': [0], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
      }],
    }
    this.searchGridForm();
    this.addCourseForm();
    this.addModuleForm();
    // this.addNewOption();
    this.quizFormGroup();

    
    // this.formQuizGroup = this.fb.group({

    //   formArrayQuiz: this.fb.array([
    //     this.addNewQuestion(),
    //   ])
    // });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next('');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  quizFormGroup() {
    this.formQuizGroup = this._fb.group({
      formArrayQuiz: new FormArray([this.addNewQuestion()])
    })



  }
  get c() {

    return this.formAddCourse.controls;
  }
  get m() {
    return this.formAddModule.controls;
  }
  searchGridForm() {
    this.formSearchGrid = this._fb.group({
      COURSE_NAME: [null],
      NO_OF_MODULES: [null],
      CATEGORY: [null],
      SUB_CATEGORY: [null],
      LEVEL_OF_COURSE: [null],

    })
  }

  addCourseForm() {
    this.formAddCourse = this._fb.group({
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
    this.formAddModule = this._fb.group({
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
    this._service.getCourseGridData(obj).subscribe(res => {
      this.data = res.Data;
      //  this.dtTrigger.next(res.Data)
      debugger
    })
  }

  submitCourse() { //save only course
    debugger
    this.courseSubmitted = true;
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
      var payload = {
        OPERATION: "Insert",
        USER_ID: "Admin",
        VALUES: [obj]

      }
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      this._service.insertCourseData(formData).subscribe(res => {
        debugger
        if (res.responseCode == 200) {
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
  //add module button
  submitModule() {
    debugger
    this.courseSubmitted = true;
    this.moduleSubmitted = false;
    this.flagg = false


    if (this.formAddCourse.valid) {
      this.formAddModule.controls['COURSE_NAME'].setValue(this.formAddCourse.controls['COURSE_NAME']?.value);
      if (this.editData?.MODULES) {
        for (let i = 0; i <= this.editData.MODULES.length - 1; i++) {
          this.arryAddModule.push(this.editData.MODULES[i]);
        }
        if (this.arryAddModule.length == 0) {
          this.sequenceNo = 1;
        }
        else {
          this.sequenceNo = this.arryAddModule.length + 1;
        }
      }
      else {

      }
      this.addModule.nativeElement.click()
    }
  }

  uploadThumbnail(event: any) {
    debugger

    let moduleId = JSON.parse(`${sessionStorage.getItem("moduleId")}`)
    this.fileToUpload = event.target.files;
    this.files = this.fileToUpload;

    var file = {
      "name": this.fileToUpload[0].name,
      "module":this.formAddModule.get("MODULE_NUMBER")?.value
    }
    this.fileData.push(file)
    
    
    // if(this.videoSrc==undefined ||this.videoSrc=='' ){
    //   this.sequenceNo=this.sequenceNo+1;
    // }
    // this.fileToUpload.seqNo = this.sequenceNo
    // this.fileToUpload.seqNo=moduleId?this.index:this.arryAddModule.length;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.formAddModule.controls['THUMBNAIL_PATH']?.setValue(this.imageSrc)
    }
  }
  uploadVideo(event: any) {
    let moduleId = JSON.parse(`${sessionStorage.getItem("moduleId")}`)
    this.videoToUpload = event.target.files;
    this.files1 = this.videoToUpload

    var file = {
      "name": this.videoToUpload[0].name,
      "module":this.formAddModule.get("MODULE_NUMBER")?.value
    }
    this.fileData.push(file)
    // if(this.imageSrc==undefined ||this.imageSrc==''  ){
    //   this.sequenceNo=this.sequenceNo+1;
    // }
    // this.videoToUpload.seqNo = this.sequenceNo
    // this.videoToUpload.seqNo=moduleId?this.index:this.arryAddModule.length;
    // this.files.push(this.videoToUpload)
    // this.videoToUpload = event.target.files[0] as File;
    // this.videoToUpload.append('file', this.videoToUpload, this.videoToUpload.name);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.videoSrc = reader.result as string;
      this.formAddModule.controls['VIDEO_PATH']?.setValue(this.videoSrc)
    }
  }
  uploadCrossClick(value: string) {
    debugger
    ;
    if (value == 'image') {
      this.arrayfilesDelete?.push(this.imageSrc);
      this.imageSrc = '';
      // if((this.videoSrc!='' && !this.flagg)|| (this.videoSrc=='' && !this.flagg)||(this.videoSrc!=undefined && !this.flagg))
      // this.sequenceNo=this.sequenceNo-1
      // this.flagg=true
    }
    else {
      this.arrayfilesDelete?.push(this.videoSrc);
      this.videoSrc = '';
      // if((this.imageSrc=='' && !this.flagg) ||(this.imageSrc!='' && !this.flagg) || (this.imageSrc==undefined && !this.flagg))
      // this.sequenceNo=this.sequenceNo-1
      // this.flagg=true
    }

  }
  addButton() {
    debugger
    this.moduleSubmitted = false
    const singleModuleData = JSON.parse(`${sessionStorage.getItem("SingleModuleData")}`)
    if (this.formAddModule.valid) {
      if (singleModuleData) {
        this.arryAddModule.splice(this.index, 1)
        const ADDMODULEDATA = {
          "COURSE_ID": singleModuleData.COURSE_ID,
          "MODULE_ID": singleModuleData.MODULE_ID,
          "SEQ_NO": this.sequenceNo,
          "MODULE_NAME": this.formAddModule.controls['MODULE_NAME']?.value,
          "MODULE_NUMBER": this.formAddModule.controls['MODULE_NUMBER']?.value,
          "MODULE_DURATION": this.formAddModule.controls['MODULE_DURATION']?.value,
          "MODULE_DESCRIPTION": this.formAddModule.controls['MODULE_DESCRIPTION']?.value,
          "THUMBNAIL_PATH": this.formAddModule.controls['THUMBNAIL_PATH']?.value,
          "VIDEO_PATH": this.formAddModule.controls['VIDEO_PATH']?.value,
          "FILE_DATA":this.fileData,
        }
        this.arryAddModule.push(ADDMODULEDATA);
        sessionStorage.removeItem('SingleModuleData');
        this.formAddModule.reset();
        this.videoSrc = '';
        this.imageSrc = '';
        this.videoToUpload = [];
        this.fileToUpload = [];
        this.fileData=[];
      }
      else {

        this.arryAddModule.slice(this.index, 1)
        const ADDMODULEDATA = {
          "COURSE_ID": "0",
          "MODULE_ID": "0",
          "SEQ_NO": this.sequenceNo,
          "MODULE_NAME": this.formAddModule.controls['MODULE_NAME']?.value,
          "MODULE_NUMBER": this.formAddModule.controls['MODULE_NUMBER']?.value,
          "MODULE_DURATION": this.formAddModule.controls['MODULE_DURATION']?.value,
          "MODULE_DESCRIPTION": this.formAddModule.controls['MODULE_DESCRIPTION']?.value,
          "THUMBNAIL_PATH": "string",
          "VIDEO_PATH": "string",
          "FILE_DATA":this.fileData,
        }

        // console.log(this.formData.get('files'));
        this.arryAddModule.push(ADDMODULEDATA);
        // 

        this.formAddModule.reset();
        this.sequenceNo = this.sequenceNo + 1
        this.videoSrc = '';
        this.imageSrc = '';
        this.videoToUpload = [];
        this.fileToUpload = [];
        this.fileData=[];
      }

    }
    else {
      this.moduleSubmitted = true;
    }

  }
  //Save button in module canvas
  saveButton() {
    debugger

    if (this.arryAddModule.length == 0) {
      Swal.fire('Add atleast one module')
    }
    else {
      var obj = {
        "COURSE_ID": this.editData.COURSE_ID ? this.editData.COURSE_ID : "0",
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

        "MODULES": this.arryAddModule,
      }
      console.log(obj)

      // this.thumbnailData.append( this.fileToUpload,'file');
      //  this.thumbnailData.append(JSON.stringify(obj),"payload");
      var payload = {
        OPERATION: "Insert",
        USER_ID: "Admin",
        VALUES: [obj]

      }
      // var p = {
      //   payload: JSON.stringify(payload),
      //   images: this.files
      // }
    const formData = new FormData();

        for (const image of this.files) {
          formData.append('images', image);
        }
        for (const image1 of this.files1) {
          formData.append('images', image1);
        }
      // this.formData.append("payload",JSON.stringify(payload))
      // this.formData.append("file", this.files)
        formData.append("payload", JSON.stringify(payload))

      this._service.insertCourseData(formData).subscribe(res => {
        debugger
        if (res[0] != null || res[0] != undefined) {
          // this.insertThumbnail(res.data);
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
  insertThumbnail(value: number) {
    debugger
    var obj = new Course();
    obj.COURSE_ID = value;
    obj.file = this.thumbnailData;
    this._service.uploadThumbnail(obj).subscribe(res => {
      debugger
      if (res.responseMessage == 'Thumbnail Uploaded SuccessFully!') {
        this.insertVideo(value)
      }

    })
  }
  insertVideo(value: number) {
    debugger
    var obj = new Course();
    obj.COURSE_ID = value;
    obj.file = this.videoData;
    this._service.uploadVideo(obj).subscribe(res => {
      debugger
      if (res.responseMessage == 'Course Uploaded SuccessFully!') {
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
  setThumbnail(e: any) {
    debugger
    const fThumbnail = document.getElementById('THUMBNAIL_PATH') as HTMLInputElement
    if (fThumbnail) {
      fThumbnail.click();
    }
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
    }).then((result: any) => {
      if (result.isConfirmed) {
        var obj = new Course();
        obj.COURSE_ID = item;
        this._service.deleteCourseById(obj).subscribe(res => {
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
  deleteModuleById(value: number) {
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
        obj.MODULE_ID = value;
        this._service.deleteModuleById(obj).subscribe(res => {
          debugger
          if (res.ResponseMessage == 'Module deleted Successfully') {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
          }
        })

      } else if (

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
    this._service.getCourseById(obj).subscribe(res => {
      debugger
      this.editData = res.Data;
      this.formAddCourse.patchValue(this.editData);
      sessionStorage.setItem('courseAndModuleDetails', JSON.stringify(this.editData));


    })
  }
  editModule(value: any) {
    debugger
    sessionStorage.removeItem('moduleId')
    const courseAndModuleDetails = JSON.parse(`${sessionStorage.getItem("courseAndModuleDetails")}`)
    sessionStorage.setItem("moduleId", value.MODULE_ID)
    var obj = new Course();
    obj.MODULE_ID = value.MODULE_ID
    this._service.GetUploadedCourseImgAndVideo(obj).subscribe(res => {
      debugger
      this.arrfileData = res.data[0];
      this.imageSrc = res.data[0].filE_PATH
      this.videoSrc = res.data1[0].filE_PATH
      // this.formAddModule.controls['THUMBNAIL_PATH'].setValue(res.data1[0].filE_PATH)
      // this.formAddModule.controls['THUMBNAIL_PATH'].setValue(res.data[0].filE_PATH)

    })
    this.index = courseAndModuleDetails.MODULES.findIndex((i: { MODULE_NUMBER: Number; }) => i.MODULE_NUMBER === value.MODULE_NUMBER);
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
      this._service.searchGrid(obj).subscribe(res => {
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
    this.courseSubmitted = false;
    this.moduleSubmitted = false;
    this.formAddCourse.reset();
    this.formAddModule.reset();
    this.arryAddModule = [];
    this.editData = [];
    sessionStorage.removeItem('courseDetails');
  }
  //Quiz part

  addNewQuestion(): FormGroup {
    return this._fb.group({
      QUESTION_ID: [0],
      QUESTION_NUMBER: [],
      QUESTION: [],
      formArrayQuizOption: new FormArray(this.addNewOption())

    })
  }
  addNewOption() {
    const option = []
    for (var i = 0; i < 4; i++) {
      option.push(this._fb.group({
        OPTION_ID: [0],
        QUESTION_ID: [0],
        OPTIONS: [],
        IS_CORRECT: [false]

      }))
    }
    return option;
  }

  getFormGroup(i: any) {
    const ad = this.formQuizGroup.get('formArrayQuiz') as FormArray;
    return ad.at(i).get('formArrayQuizOption') as FormGroup;
  }

  getFormQuestion(i: any) {

    const ad = this.formQuizGroup.get('formArrayQuiz') as FormArray;
    ad.controls[i]?.get('QUESTION_NUMBER')?.setValue(i + 1)
    return ad.at(i) as FormGroup;
  }

  getOptionArray(i: any, j: any) {

    const ad = this.formQuizGroup.get('formArrayQuiz') as FormArray;

    return ad.at(i).get('formArrayQuizOption') as FormArray;
  }
  getOptionForm(o: any) {
    return o as FormGroup;
  }
  // getOptionArray(){
  //   const ad = this.formQuizGroup.get('formArrayQuiz') as FormArray;
  //   return ad.at(i).get('formArrayQuizOption') as FormArray;
  // }
  get addRowControls(): FormArray {
    return this.formQuizGroup.get('formArrayQuiz') as FormArray;
  }


  addCard() {

    // const control = <FormArray> this.formQuizGroup.get('formArrayQuiz');
    // control.push(this.addNewQuestion());
    this.addRowControls?.push(this.addNewQuestion());
    // this.formArrayQuiz.push(this.addRowControls?.length)
    // this.addRowControls?.push(this.addNewQuestion());
  }
  // addNewOption():FormGroup{
  //   debugger
  //   const quiz=this.fb.group({

  //   });
  //   this.formArrayQuiz?.push(quiz)
  // }
  addquzibutton() {
    debugger
    this.courseSubmitted = true;
    this.flagg = false
    if (this.formAddCourse.valid) {
      this.addquiz.nativeElement.click()
      this.formArrayQuiz = this._fb.array([])
    }

  }
  saveQuiz() {
    debugger
    console.log(this.addRowControls.value)
    if (this.formAddCourse.valid && this.formQuizGroup.valid) {

      var obj = {
        "COURSE_ID": this.editData.COURSE_ID ? this.editData.COURSE_ID : "0",
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

        "MODULES": [],
      }
      console.log(obj)
      var payload = {
        OPERATION: "Insert",
        USER_ID: "Admin",
        VALUES: [obj]

      }

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      this._service.insertCourseData(formData).subscribe(res => {
        debugger
        if (res[0] != null || res[0] != undefined) {

          this.getQuizPayload(res[0])
        }

      })
    }

  }

  getQuizPayload(value: number) {
    debugger
    console.log(this.addRowControls.value)
    var obj = new Course()
    obj.OPERATION = "Insert",
      obj.USER_ID = "komalk0607",
      obj.COURSE_ID = value,
      obj.VALUES =
      this.addRowControls.value
    console.log(obj)
    this._service.insertQuiz(obj).subscribe(res => {
      debugger
      if (res.responseMessage == "Quiz Saved Successfully !") {

        Swal.fire({
          icon: 'success',
          title: 'Your course and quiz has been saved',
          showConfirmButton: false,
          timer: 2500
        })
        this.getGridData();
      }
    })
  }
}
