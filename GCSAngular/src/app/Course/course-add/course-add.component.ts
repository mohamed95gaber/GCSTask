import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICourse } from 'src/app/interfaces/ICourse';
import { CourseService } from 'src/app/services/Course.service';
import { InstructorService } from 'src/app/services/Instructor.service';
import { IInstructor } from 'src/app/interfaces/IInstructor';
import { StudentService } from 'src/app/services/Student.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
 @Output() newCourse=new EventEmitter<ICourse>();
 course:ICourse;
 instructors:any[]=[];
 students:any[]=[];
 Name:string;
 Code:number;
 Hours:number;
 instructorsId:number[];
 studentId:number[];
 
  constructor(private CourseService:CourseService,private InstructorService:InstructorService,private StudentService:StudentService) { }
  
  ngOnInit() {  
   this.InstructorService.getInstructors().subscribe(data=>{
     this.instructors=data;
   });
   this.StudentService.getStudents().subscribe(data=>{
   this.students=data;
   });

  }
  addCourse(f){
    if(f.value.Name ==undefined ){
      alert("you must add name ");
    }
    else{
 
    f.value.isDeleted=false;
    this.CourseService.addCourse(f.value).subscribe(
      data=>{
        
        this.course={
          Id:data.id,
          Name:data.name,
          Code:data.code,
          Hours:data.hours
        }
        this.newCourse.emit(this.course);

      }
    );
  }
      this.Name=undefined;
      this.Code=undefined;
      this.Hours=undefined;
      this.instructorsId=undefined;
      this.studentId=undefined;
     
        
  }
  cancel(){
    this.Name=undefined;
    this.Code=undefined;
    this.Hours=undefined;
    this.instructorsId=undefined;
    this.studentId=undefined;
  }

}
