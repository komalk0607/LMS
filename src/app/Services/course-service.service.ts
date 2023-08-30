import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../Modals/CourseModals/course-model';
import { environment } from '../environments/environmentprod';
@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  baseUrl: string = ''
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };

  httpOptions1 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
  };
  constructor(private http: HttpClient) {
    this.baseUrl = environment.BaseUrl;
  }
  getCourseGridData(obj:Course) {
    debugger
    return this.http.get<any>(this.baseUrl + "Course/GetAllCourse?CREATED_BY=" +obj.CREATED_BY)
  }
  getCourseById(obj:Course){
    return this.http.get<any>(this.baseUrl + "Course/GetCourseById?COURSE_ID=" +obj.COURSE_ID)
  }
  insertCourseData(obj:any){
    debugger
    return this.http.post<any>(this.baseUrl + "Course/insertCourse",obj)
  }
  insertCourseData1(obj:any){
    debugger
    return this.http.post<any>(this.baseUrl + "Course/InsertCourse1",obj,this.httpOptions)
  }
  deleteCourseById(obj:Course) {
    return this.http.delete<any>(this.baseUrl + "Course/DeleteCourseById?COURSE_ID=" +obj.COURSE_ID,this.httpOptions)
  }
  deleteModuleById(obj:Course) {
    return this.http.delete<any>(this.baseUrl + "Course/DeleteModuleById?MODULE_ID=" +obj.MODULE_ID,this.httpOptions)
  }
  searchGrid(obj:Course){
    return this.http.get<any>(this.baseUrl + "Course/GetSearchCourse?COURSE_NAME="+obj.COURSE_NAME+
    "&NO_OF_MODULES="+obj.NO_OF_MODULES+
    "&CATEGORY="+obj.CATEGORY+
    "&APPROVER="+obj.APPROVER+
    "&LEVEL_OF_COURSE="+obj.LEVEL_OF_COURSE+
    "&CREATED_BY="+ obj.CREATED_BY,this.httpOptions)
  }

  uploadThumbnail(obj:Course){
    debugger
    return this.http.post<any>(this.baseUrl + "Course/UploadThumbnail?COURSE_ID="+ obj.COURSE_ID, obj.file)
  }
  uploadVideo(obj:Course){
    debugger
    return this.http.post<any>(this.baseUrl + "Course/UploadCourse?COURSE_ID="+ obj.COURSE_ID, obj.file)
  }
  GetUploadedCourseImgAndVideo(obj1:Course){
    return this.http.get<any>(this.baseUrl + "Course/GetUploadedCourseImgAndVideo?MODULE_ID=" +obj1.MODULE_ID)
  }
  getVideoById(obj:Course){
    return this.http.get<any>(this.baseUrl + "Course/GetUploadCourse?COURSE_ID=" +obj.COURSE_ID)
  }

  insertQuiz(obj:Course){
    return this.http.post<any>(this.baseUrl + "Quiz/InsertQuiz",obj,this.httpOptions)
  }
  deleteQuestion(obj:Course){
    return this.http.post<any>(this.baseUrl + "Quiz/DeleteSingleQuestion",obj,this.httpOptions)
  }

  getMasterDetails(obj:Course){
    return this.http.get<any>(this.baseUrl + "Course/getMasterDetails?STR=" +obj.STR)
  }
}
