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
    return this.http.get<any>(this.baseUrl + "GetAllCourse?CREATED_BY=" +obj.CREATED_BY)
  }
  getCourseById(obj:Course){
    return this.http.get<any>(this.baseUrl + "GetCourseById?COURSE_ID=" +obj.COURSE_ID)
  }
  insertCourseData(obj:any){
    debugger
    return this.http.post<any>(this.baseUrl + "insertCourse",obj)
  }
  insertCourseData1(obj:any){
    debugger
    return this.http.post<any>(this.baseUrl + "InsertCourse1",obj,this.httpOptions)
  }
  deleteCourseById(obj:Course) {
    return this.http.delete<any>(this.baseUrl + "DeleteCourseById?COURSE_ID=" +obj.COURSE_ID,this.httpOptions)
  }
  deleteModuleById(obj:Course) {
    return this.http.delete<any>(this.baseUrl + "DeleteModuleById?MODULE_ID=" +obj.MODULE_ID,this.httpOptions)
  }
  searchGrid(obj:Course){
    return this.http.get<any>(this.baseUrl + "GetSearchCourse?COURSE_NAME="+obj.COURSE_NAME+
    "&NO_OF_MODULES="+obj.NO_OF_MODULES+
    "&CATEGORY="+obj.CATEGORY+
    "&SUB_CATEGORY="+obj.SUB_CATEGORY+
    "&LEVEL_OF_COURSE="+obj.LEVEL_OF_COURSE+
    "&CREATED_BY="+ obj.CREATED_BY,this.httpOptions)
  }

  uploadThumbnail(obj:Course){
    debugger
    return this.http.post<any>(this.baseUrl + "UploadThumbnail?COURSE_ID="+ obj.COURSE_ID, obj.file)
  }
  uploadVideo(obj:Course){
    debugger
    return this.http.post<any>(this.baseUrl + "UploadCourse?COURSE_ID="+ obj.COURSE_ID, obj.file)
  }
  GetUploadedCourseImgAndVideo(obj1:Course){
    return this.http.get<any>(this.baseUrl + "GetUploadedCourseImgAndVideo?MODULE_ID=" +obj1.MODULE_ID)
  }
  getVideoById(obj:Course){
    return this.http.get<any>(this.baseUrl + "GetUploadCourse?COURSE_ID=" +obj.COURSE_ID)
  }
}
