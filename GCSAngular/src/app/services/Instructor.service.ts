import { Injectable } from '@angular/core';
import { IInstructor } from 'src/app/interfaces/IInstructor';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  handleError: any;

  constructor(private http: Http) { }
  public getInstructors() :Observable<any>{
    return this.http.get("http://localhost:43230/api/Instructors")
      .map((res: any) => res.json())
      .catch(this.handleError);
  }
  public getInstructorById(id): Observable<any> {
    return this.http.get("http://localhost:43230/api/Instructors/" + id)
    .map((res: any) => res.json())
  }
  public deleteInstructor(id): Observable<{}> {
    console.log(id);
    return this.http.delete("http://localhost:43230/api/Instructors/" + id )
  
  }
  updateInstructor (instructor:IInstructor): Observable<{}> {
    return this.http.put("http://localhost:43230/api/Instructors/"+instructor.Id,instructor);
  }
  addInstructor(instructor:IInstructor): Observable<any> {
    return this.http.post("http://localhost:43230/api/Instructors",instructor)
    .map(res=>res.json());
  }

}
