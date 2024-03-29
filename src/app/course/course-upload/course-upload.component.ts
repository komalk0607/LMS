import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseServiceService } from 'src/app/Services/course-service.service';
import { Course } from 'src/app/Modals/CourseModals/course-model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { CommonServiceService } from 'src/app/Services/CommonService/common-service.service';
declare var $: any;
@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css']
})
export class CourseUploadComponent implements OnInit {

  @ViewChild("addModule") addModule: any;
  @ViewChild("addquiz") addquiz: any;
  dropdownList :any=[];
  selectedItems : any=[];
  dropdownSettings:IDropdownSettings={};
  dropDownForm!:FormGroup;
  formData = new FormData()
  formAddCourse!: FormGroup;
  formAddModule!: FormGroup;
  formSearchGrid!: FormGroup;
  formQuizGroup!: FormGroup;
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
  quizSubmitted: boolean = false;
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
  fileData: Array<any> = [];
  deleteQuestionByCrossClick: any=[];
  flagLoader: boolean=false;

  constructor(private _fb: FormBuilder,  private _service: CourseServiceService, private _http: HttpClient,private _commonService:CommonServiceService) {
    this.formArrayQuiz = this._fb.array([])
  }
  ngOnInit(): void {
    sessionStorage.removeItem('courseDetails');
    sessionStorage.removeItem('SingleModuleData');
    sessionStorage.removeItem('courseAndModuleDetails');
    sessionStorage.removeItem('moduleId');
    this.getGridData();
    this.dropdownSettings = {
      idField: 'BUSINESS_ID',
      textField: 'BUSINESS_NAME',
      allowSearchFilter:true,
    };
    this.dtoptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
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
    this.getBusinessDropdown();

   
  }
  quizFormGroup() {
    this.formQuizGroup = this._fb.group({
      formArrayQuiz: new FormArray([this.addNewQuestion(0)])
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
      APPROVER: [null],
      LEVEL_OF_COURSE: [null],

    })
  }

  addCourseForm() {
    this.formAddCourse = this._fb.group({
      COURSE_NAME: [null, [Validators.required]],
      NO_OF_MODULES: [null, [Validators.required]],
      CATEGORY: [null, [Validators.required]],
      APPROVER: [null, [Validators.required]],
      BUSINESS: [this.selectedItems, [Validators.required]],
      LEVEL_OF_COURSE: [null, [Validators.required]],
      // INSTRUCTOR_NAME: [null, [Validators.required]],
      // COURSE_OUTCOME: [null, [Validators.required]],
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
    this.flagLoader=true;
    var obj = new Course();
    obj.CREATED_BY = 'komalk0607';
    this._service.getCourseGridData(obj).subscribe(res => {
      this.data = res.Data;
      this.flagLoader=false;
      this._commonService.getDT();
    //  this.dtTrigger.next(res.Data)
    })
    
  }
  getBusinessDropdown(){
    var obj=new Course();
    obj.STR="BUSINESS_DETAILS"
    this._service.getBusinessDetails(obj).subscribe(res=>{
      debugger
      this.dropdownList=res.Data;

    })
  }
  submitCourse() { //save only course
    debugger
    this.courseSubmitted = true;
    if (this.formAddCourse.valid) {
      //this.formGlag = true
      
        // alert(JSON.stringify(this.formAddCourse.value))
        var obj = {
          "COURSE_ID": this.editData.COURSE_ID ? this.editData.COURSE_ID : "0",
          "COURSE_NAME": this.formAddCourse.controls['COURSE_NAME'].value,
          "USER_ID": 'komalk0607',
          "COURSE_DESCRIPTION": this.formAddCourse.controls['COURSE_DESCRIPTION'].value,
          "NO_OF_MODULES": this.formAddCourse.controls['NO_OF_MODULES'].value,
          "CATEGORY": this.formAddCourse.controls['CATEGORY'].value,
          "APPROVER": this.formAddCourse.controls['APPROVER'].value,
          "LEVEL_OF_COURSE": this.formAddCourse.controls['LEVEL_OF_COURSE'].value,
          // "INSTRUCTOR_NAME": this.formAddCourse.controls['INSTRUCTOR_NAME'].value,
          "BUSINESS":this.formAddCourse.controls['BUSINESS'].value,
          // "COURSE_OUTCOME": this.formAddCourse.controls['COURSE_OUTCOME'].value,
          "CREATED_BY": 'komalk0607',
          "CREATED_DATE": '2023-08-07T11:02:46.055Z',
          "UPDATED_BY": 'string',
          "UPDATED_DATE": '2023-08-07T11:02:46.055Z',
  
          "MODULES": [
  
          ]
        }
        var payload = {
          OPERATION: "InsertOnlyCourse",
          USER_ID: "Admin",
          VALUES: [obj]
  
        }
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        this._service.insertCourseData(formData).subscribe(res => {
          debugger
          if (res.ResponseMessage=='Success') {
            Swal.fire({
              icon: 'success',
              title: 'Your course has been saved',
              showConfirmButton: false,
              timer: 2000
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

    for (let i = 0; i < this.fileToUpload.length; i++) {
      this.files.push(this.fileToUpload[i]);
      const formData = new FormData()
      formData.append("files", this.fileToUpload[i]);

    }

    var file = {
      "name": this.fileToUpload[0].name,
      "module": this.formAddModule.get("MODULE_NUMBER")?.value
    }
    this.fileData.push(file)



    // if(this.videoSrc==undefined ||this.videoSrc=='' ){
    //   this.sequenceNo=this.sequenceNo+1;
    // }
    // this.fileToUpload.seqNo = this.sequenceNo
    // this.fileToUpload.seqNo=moduleId?this.index:this.arryAddModule.length;

    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = () => {
    //   this.imageSrc = reader.result as string;
    //   this.formAddModule.controls['THUMBNAIL_PATH']?.setValue(this.imageSrc)
    // }
    this.imageSrc=event.target.files[0].name;

  }
  uploadVideo(event: any) {
    let moduleId = JSON.parse(`${sessionStorage.getItem("moduleId")}`)
    this.videoToUpload = event.target.files;

    for (let i = 0; i < this.videoToUpload.length; i++) {
      this.files1.push(this.videoToUpload[i]);
      const formData = new FormData()
      formData.append("video", this.videoToUpload[i]);
    }


    var file = {
      "name": this.videoToUpload[0].name,
      "module": this.formAddModule.get("MODULE_NUMBER")?.value
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
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = () => {
    //   this.videoSrc = reader.result as string;
    //   this.formAddModule.controls['VIDEO_PATH']?.setValue(this.videoSrc)
    // }
    this.videoSrc=event.target.files[0].name;
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
          "FILE_DATA": this.fileData,
        }
        this.arryAddModule.push(ADDMODULEDATA);
        sessionStorage.removeItem('SingleModuleData');
        this.formAddModule.reset();
        this.videoSrc = '';
        this.imageSrc = '';
        this.videoToUpload = [];
        this.fileToUpload = [];
        this.fileData = [];
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
          "FILE_DATA": this.fileData,
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
        this.fileData = [];
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
        "APPROVER": this.formAddCourse.controls['APPROVER'].value,
        "LEVEL_OF_COURSE": this.formAddCourse.controls['LEVEL_OF_COURSE'].value,
        // "INSTRUCTOR_NAME": this.formAddCourse.controls['INSTRUCTOR_NAME'].value,
        "BUSINESS":this.formAddCourse.controls['BUSINESS'].value,
        // "COURSE_OUTCOME": this.formAddCourse.controls['COURSE_OUTCOME'].value,
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
        if (res.ResponseMessage=='Success') {
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
    this.imageSrc='';
    this.videoSrc='';
    sessionStorage.removeItem('courseAndModuleDetails');
    this.formAddModule.reset();
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

    // this.imageSrc=res.Data[0].THUMBNAIL_PATH.split('\',3)

    const a: string[] = res.Data[0].THUMBNAIL_PATH.split('\\');
    const b: string[] = a[a.length - 1].split('_');
    this.imageSrc=b[b.length - 1]

    const c: string[] = res.Data[0].VIDEO_PATH.split('\\');
    const d: string[] = c[c.length - 1].split('_');
    this.videoSrc=d[d.length - 1]

    //this.videoSrc=res.Data[0].VIDEO_PATH
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
        this._commonService.destroyDT()

        this.data = res.Data
        this._commonService.getDT();
        
      })
      
    }

  }
  clearSearch() {
    this.getGridData();
    this._commonService.destroyDT();
    this.formSearchGrid.reset();
  }

  closeCanvas() {
    debugger
    this.courseSubmitted = false;
    this.moduleSubmitted = false;
    this.quizSubmitted=false;
    this.formAddCourse.reset();
    this.formAddModule.reset();
    this.arryAddModule = [];
    this.editData = [];
    this.imageSrc='';
    this.videoSrc='';
    sessionStorage.removeItem('courseDetails');
    sessionStorage.removeItem('moduleId');
    sessionStorage.removeItem('courseAndModuleDetails');
    sessionStorage.removeItem('SingleModuleData');
  }
  //Quiz part

  addNewQuestion(e: any): FormGroup {
    debugger
    return this._fb.group({
      QUESTION_ID: [0],
      QUESTION_NUMBER: [],
      QUESTION: ['',[Validators.required]],
      formArrayQuizOption: new FormArray(this.addNewOption())

    })
  }
  addNewOption() {
    const option = []
    for (var i = 0; i < 4; i++) {
      option.push(this._fb.group({
        OPTION_ID: [0],
        QUESTION_ID: [0],
        OPTIONS: ['',[Validators.required]],
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
    this.addRowControls?.push(this.addNewQuestion(0));
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
    this.deleteQuestionByCrossClick=[];
    if (this.formAddCourse.valid) {
      
      // sessionStorage.removeItem('moduleId')
      const constCourseAndModuleDetails = JSON.parse(`${sessionStorage.getItem("courseAndModuleDetails")}`)
      // sessionStorage.setItem("moduleId", value.MODULE_ID)
     
      if(constCourseAndModuleDetails?.VALUES[0] !=null) 
      
      {
        // this.addRowControls.clear();
        
      this.addquiz.nativeElement.click();
      this.addRowControls.clear();
        for (let i = 0; i < (constCourseAndModuleDetails?.VALUES)?.length; i++) {
          this.addRowControls.push(this.addNewQuestion(null));
          //this.addRowControls?.at(i).patchValue(courseAndModuleDetails.VALUES[i]);
        }

        this.addRowControls?.patchValue(constCourseAndModuleDetails?.VALUES);


      }
      else {
        //this.addRowControls.clear();
        //this.addRowControls?.push(this.addNewQuestion(0));
        //this.addRowControls.clear();
      this.addquiz.nativeElement.click();
      this.addRowControls.clear();
      this.addRowControls?.push(this.addNewQuestion(0));
        this.formArrayQuiz = this._fb.array([])
        //this.addRowControls?.push('');

      }

    }

  }
  saveQuiz() {
    debugger
    console.log(this.addRowControls.value)
    console.log(  this.deleteQuestionByCrossClick)
    this.quizSubmitted=true;
   
    if (this.formAddCourse.valid && this.addRowControls.valid) {

      var obj = {
        "COURSE_ID": this.editData.COURSE_ID ? this.editData.COURSE_ID : "0",
        "COURSE_NAME": this.formAddCourse.controls['COURSE_NAME'].value,
        "COURSE_DESCRIPTION": this.formAddCourse.controls['COURSE_DESCRIPTION'].value,
        "NO_OF_MODULES": this.formAddCourse.controls['NO_OF_MODULES'].value,
        "CATEGORY": this.formAddCourse.controls['CATEGORY'].value,
        "APPROVER": this.formAddCourse.controls['APPROVER'].value,
        "LEVEL_OF_COURSE": this.formAddCourse.controls['LEVEL_OF_COURSE'].value,
        // "INSTRUCTOR_NAME": this.formAddCourse.controls['INSTRUCTOR_NAME'].value,
        "BUSINESS":this.formAddCourse.controls['BUSINESS'].value,
        // "COURSE_OUTCOME": this.formAddCourse.controls['COURSE_OUTCOME'].value,
        "CREATED_BY": 'komalk0607',
        "CREATED_DATE": '2023-08-07T11:02:46.055Z',
        "UPDATED_BY": 'string',
        "UPDATED_DATE": '2023-08-07T11:02:46.055Z',

        "MODULES": [],
      }
      console.log(obj)
      var payload = {
        OPERATION: "InsertOnlyCourse",
        USER_ID: "Admin",
        VALUES: [obj]

      }

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      this._service.insertCourseData(formData).subscribe(res => {
        debugger
        if (res.ResponseMessage=='Success') {

          this.getQuizPayload(res.Data[0].COURSE_ID)
        }

      })
    }
    
  }

  getQuizPayload(value: number) {
    debugger
    console.log(this.addRowControls.value)
    var obj = new Course()
    obj.OPERATION = "InsertQuiz",
      obj.USER_ID = "komalk0607",
      obj.COURSE_ID = value,
      obj.VALUES =
      this.addRowControls.value
    console.log(obj)
    const btn = document.getElementById('saveQuiz') as HTMLButtonElement;
    this._service.insertQuiz(obj).subscribe(res => {
      debugger
      if (res.responseMessage == "Quiz Saved Successfully !") {
        if(this.deleteQuestionByCrossClick?.length !=0){
          this.deleteQuestionPayload(value);
          btn.click();
        }
        
        else {
          Swal.fire({
            icon: 'success',
            title: 'Your course and quiz has been saved',
            showConfirmButton: false,
            timer: 3000
          })
          btn.click();
          this.getGridData();
        }
       
      }
    })
  }
  viewCourseDetails(id: number) {
    debugger
    this.arryAddModule = [];
    var obj = new Course();
    obj.COURSE_ID = id;
    this._service.getCourseById(obj).subscribe(res => {
      debugger
      this.editData = res.Data;
      // this.formAddCourse.patchValue(this.editData);
      // sessionStorage.setItem('courseAndModuleDetails', JSON.stringify(this.editData));


    })
  }
  deleteQuestion(i:number){
    debugger
    this.deleteQuestionByCrossClick.push(this.addRowControls.at(i).value)
    
    this.addRowControls.removeAt(i);
    
  }
  deleteQuestionPayload(value:number){
    var obj1 = new Course()
    obj1.OPERATION = "DeleteSingleQuestion",
   obj1.USER_ID = "komalk0607",
   obj1.COURSE_ID = value,
   obj1.VALUES =
   this.deleteQuestionByCrossClick
 console.log(obj1)
 this._service.deleteQuestion(obj1).subscribe(res => {
  if(res.responseMessage=='Question deleted Successfully !')
  {
    Swal.fire({
      icon: 'success',
      title: 'Your course and quiz has been saved',
      showConfirmButton: false,
      timer: 2500
    })
    this.deleteQuestionByCrossClick=[];
    this.getGridData();
  }
   
 })
  }
  modulenumber(e:Event){
debugger

  }
  backButton(){
  this.arryAddModule=[];
  }
}
