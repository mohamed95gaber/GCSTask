import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IInstructor } from 'src/app/interfaces/IInstructor';
import { InstructorService } from 'src/app/services/Instructor.service';

@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class InstructorEditComponent implements OnInit {
  @Input() instructor:IInstructor;
  @Output() uptinstructor=new EventEmitter<any>();
  
  Name?:string;
  Phone?:number;
  Mail?:string;
  Dept?:string;
  Courses?:string[];
    constructor(private InstructorService:InstructorService) { }
  
    ngOnInit() {
       if(this.instructor == undefined){
         this.instructor={};
       }
    }
    EditInstructor(f){
      
        var uptInstructor:IInstructor={
          Id:this.instructor.Id,
          Name:f.value.Name== undefined ? this.instructor.Name:f.value.Name ,
          Phone:f.value.Phone == undefined ? this.instructor.Phone:f.value.Phone  ,
          Mail:f.value.Mail == undefined ? this.instructor.Mail:f.value.Mail ,
          isDeleted:false,
          Dept:f.value.Dept == undefined ? this.instructor.Dept:f.value.Dept ,
         
       }
        
        this.uptinstructor.emit(uptInstructor);
        this.InstructorService.updateInstructor(uptInstructor).subscribe();
        this.Name=undefined;
        this.Phone=undefined;
        this.Mail=undefined;
        this.Dept=undefined;        
        
    }
  
  
    cancel(){
      this.Name=undefined;
      this.Phone=undefined;
      this.Mail=undefined;
      this.Dept=undefined; 
    }
}
