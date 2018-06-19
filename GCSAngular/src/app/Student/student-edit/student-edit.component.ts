import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStudent } from 'src/app/interfaces/IStudent';
import { StudentService } from 'src/app/services/Student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @Input() student:IStudent;
  @Output() uptstudent=new EventEmitter<any>();
  Id? :number;
  Name?:string;
  Phone?:number;
  Mail?:string;
  Birthdate?:Date;
  Courses?:string[];
  Instructors?:string[];
    constructor(private StudentService:StudentService) { }
  
    ngOnInit() {
       if(this.student == undefined){
         this.student={};
       }
    }
    editStudent(f){
      
        var uptStudent:IStudent={
          Id:this.student.Id,
          Name:f.value.Name== undefined ? this.student.Name:f.value.Name ,
          Phone:f.value.Phone == undefined ? this.student.Phone:f.value.Phone  ,
          Mail:f.value.Mail == undefined ? this.student.Mail:f.value.Mail ,
          Birthdate:f.value.Birthdate == undefined ? this.student.Birthdate:f.value.Birthdate ,
          isDeleted:false,
          Courses:this.student.Courses,
       }
        
        this.uptstudent.emit(uptStudent);
        this.StudentService.updateStudent(uptStudent).subscribe();
        this.Name=undefined;
        this.Phone=undefined;
        this.Mail=undefined;
        this.Birthdate=undefined;        
        
    }
  
  
    cancel(){
      this.Name=undefined;
      this.Phone=undefined;
      this.Mail=undefined;
      this.Birthdate=undefined;
    }

}
