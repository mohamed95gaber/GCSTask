import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IStudent } from 'src/app/interfaces/IStudent';
import { CourseService } from 'src/app/services/Course.service';
import { InstructorService } from 'src/app/services/Instructor.service';
import { StudentService } from 'src/app/services/Student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  @Output() newStudent=new EventEmitter<IStudent>();
  students:any[]=[];
  student:IStudent;
  Name?:string;
  Phone?:number;
  Mail?:string;
  Birthdate?:Date;
  courses?:any;
  instructors?:any;
  instructorsId:number[];
  coursesId:number[];
       
       constructor(private CourseService:CourseService,private InstructorService:InstructorService,private StudentService:StudentService) { }
   
   ngOnInit() {  
    this.CourseService.getCourses().subscribe(data=>{
      this.courses=data;
    });
    this.InstructorService.getInstructors().subscribe(data=>{
      this.instructors=data; 
    });
   }
   addStudent(f){
    if(f.value.Name ==undefined ){
      alert("you must add name ");
    }
    else{

     this.StudentService.addStudent(f.value).subscribe(
   
       data=>{
       console.log(data);
       this.student={
        Id:data.id,
        Name:data.name,
        Phone:data.phone,
        Mail:data.mail,
        Birthdate:data.birthdate,
        isDeleted:false
      }
      console.log(this.student);
      debugger;
      this.newStudent.emit(this.student);

     });

    }
       this.Name=undefined;
       this.Birthdate=undefined;
       this.Phone=undefined;
       this.Mail=undefined; 
       this.instructorsId=undefined;
       this.coursesId=undefined;

         
   }
   cancel(){
    this.Name=undefined;
    this.Birthdate=undefined;
    this.Phone=undefined;
    this.Mail=undefined;  
    this.instructorsId=undefined;
    this.coursesId=undefined;
   }

}
