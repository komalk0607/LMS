import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import {FormBuilder,Validators,FormGroup,ReactiveFormsModule} from '@angular/forms'
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  styleUrls: ['./course-upload.component.css']
})
export class CourseUploadComponent implements OnInit {
  
  @ViewChild("addModule") addModule:any;
  data = [
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }, {
      "coursename": "Angular",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }, {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }, {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }, {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }, {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }, {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }


  ];
  data1 = [
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    },
    {
      "coursename": "abcd",
      "noofmodule": "02",
      "noofsubmodule": "05",
      "category": "Design",
      "subcategory": "Web Design",
      "levelofcourse": "Advance",
      "like": "3000",
      "purchased": "298",
      "view": "54545",
      "rating": "3.9",
    }

  ];
  addCourseForm!: FormGroup;
  addModuleForm!:FormGroup
  dtoptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  formGlag: boolean=false;
  constructor(private fb:FormBuilder,private modalservice:NgbModal){

  }
  ngOnInit(): void {
    
    this.dtoptions = {
      pagingType: 'full_numbers',
    }
    this.AddCourseForm();
    this.AddModuleForm();
  }

  AddCourseForm() {
    this.addCourseForm = this.fb.group({
      courseName: [null, [Validators.required]],
      noOfModule: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
      levelOfCourse: [null, [Validators.required]],
      instructor: [null, [Validators.required]],
      whatYouWillLearn: [null, [Validators.required]],
      whoCanAttend: [null, [Validators.required]],
      courseDescription: [null, [Validators.required]],

    })
  }
  AddModuleForm() {
    this.addModuleForm = this.fb.group({
      moduleName: [null, [Validators.required]],
      moduleNumber: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      moduleDescription: [null, [Validators.required]],
      uploadThumbnail: [null, [Validators.required]],
      uploadVideo:[null, [Validators.required]],
    })
  }
  submit(){
    debugger
   
    if(this.addCourseForm.invalid){
     this.formGlag=true
    }
    else {
      alert(JSON.stringify(this.addCourseForm.value))
      this.addModule.nativeElement.click()
    }
    
  }
  SubmitModule(){
    debugger
    alert(JSON.stringify(this.addModuleForm.value))
  }
  setThumbnail(e:any){
    const fThumbnail = document.getElementById('fileThumbnail') as HTMLInputElement
    fThumbnail.click(); 
  }
  
}
