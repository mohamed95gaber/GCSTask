import { Injectable } from '@angular/core';
import { IStudent } from 'src/app/interfaces/IStudent';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  handleError: any;

  constructor(private http: Http) { }
  public getStudents() :Observable<any>{
    return this.http.get("http://localhost:43230/api/Students")
      .map((res: any) => res.json())
      .catch(this.handleError);
  }
  
  public deleteStudent(id): Observable<{}> {
    console.log(id);
    return this.http.delete("http://localhost:43230/api/Students/" + id )
  
  }
  updateStudent (student:IStudent): Observable<{}> {
    return this.http.put("http://localhost:43230/api/Students/"+student.Id,student);
  }
  addStudent(student:IStudent): Observable<any> {
    return this.http.post("http://localhost:43230/api/Students/",student)
    .map(res=>res.json());
  }
  public getStudentById(id): Observable<any> {
    return this.http.get("http://localhost:43230/api/Students/" + id)
    .map((res: any) => res.json())
  }
}
