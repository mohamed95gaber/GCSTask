import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { IInstructor } from 'src/app/interfaces/IInstructor';
import { CourseService } from 'src/app/services/Course.service';
import { InstructorService } from 'src/app/services/Instructor.service';

@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.css']
})
export class InstructorAddComponent implements OnInit {
  @Output() newInstructor=new EventEmitter<IInstructor>();
  Name?:string;
  Phone?:number;
  Mail?:string;
  Dept?:string;
  newinstructor?:any;
  courses?:string[];
  CoursesId:any;
   constructor(private CourseService:CourseService,private InstructorService:InstructorService) { }
   
   ngOnInit() {  
    this.CourseService.getCourses().subscribe(data=>{
      this.courses=data;
    })
   }
   addInstructor(f){
    if(f.value.Name ==undefined ){
      alert("you must add name ");
    }
    else{
    f.value.isDeleted=false;
    this.InstructorService.addInstructor(f.value).subscribe(
      data=>{
        console.log(data);
        this.newinstructor={
          Id:data.Id,
          Name:data.name,
          Phone:data.phone,
          Mail:data.mail,
          Dept:data.dept,
          
        }
        console.log(this.newinstructor);
        this.newInstructor.emit(this.newinstructor);

      }
    );
  }
       this.Name=undefined;
       this.Phone=undefined;
       this.Mail=undefined;
       this.Dept=undefined;
       this.CoursesId=undefined;
    
      
      
         
   }
   cancel(){
    this.Name=undefined;
    this.Phone=undefined;
    this.Mail=undefined;
    this.Dept=undefined;
    this.CoursesId=undefined;
    
   }
}
