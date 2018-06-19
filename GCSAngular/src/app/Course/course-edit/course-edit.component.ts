import { Component, OnInit,Input ,Output ,EventEmitter } from '@angular/core';
import { ICourse } from 'src/app/interfaces/ICourse';
import { CourseService } from 'src/app/services/Course.service';
import { InstructorService } from 'src/app/services/Instructor.service';
import { StudentService } from 'src/app/services/Student.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
@Input() course:any;
@Output() uptCourse=new EventEmitter<any>();
instructors:any[]=[];
students:any[]=[];
Name:string;
Code:number;
Hours:number;

  constructor(private CourseService:CourseService) { }
  ngOnInit() {
 
     if(this.course == undefined){
       this.course={};
     }
  }
  EditCourse(f){

      var uptCourse:ICourse={
        Id:this.course.Id,
        Name:f.value.Name== undefined ? this.course.Name:f.value.Name ,
        Code:f.value.Code == undefined ? this.course.Code:f.value.Code  ,
        Hours:f.value.Hours == undefined ? this.course.Hours:f.value.Hours ,
        isDeleted:false,       
     }

      this.uptCourse.emit(uptCourse);
      this.CourseService.updateCourse(uptCourse).subscribe();
      this.Name=undefined;
      this.Code=undefined;
      this.Hours=undefined;  
  }


  cancel(){
    this.Name=undefined;
    this.Code=undefined;
    this.Hours=undefined;

    
  }

}
