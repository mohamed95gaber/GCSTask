import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/interfaces/ICourse';
import { Http } from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
import { IInstructor } from 'src/app/interfaces/IInstructor';
import { RequestOptions,Headers } from '@angular/http';

 


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  handleError: any;
 
constructor(private http: Http) { }
public getCourses() :Observable<any>{
  return this.http.get("http://localhost:43230/api/courses")
    .map((res: any) => res.json())
    .catch(this.handleError);
}

public getCourseById(id): Observable<any> {
  return this.http.get("http://localhost:43230/api/courses/" + id)
  .map((res: any) => res.json())
}
public deleteCourse(id): Observable<{}> {
  return this.http.delete("http://localhost:43230/api/courses/" + id )

}
updateCourse (course:ICourse): Observable<{}> {
  return this.http.put("http://localhost:43230/api/courses/"+course.Id,course);
}
addCourse(course:ICourse ): Observable<any> {
  return this.http.post("http://localhost:43230/api/courses",course)
   .map(res=>res.json());
}
}
