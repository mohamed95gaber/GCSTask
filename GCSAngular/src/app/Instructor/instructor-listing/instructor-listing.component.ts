import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/services/Instructor.service';
import { IInstructor } from 'src/app/interfaces/IInstructor';

@Component({
  selector: 'app-instructor-listing',
  templateUrl: './instructor-listing.component.html',
  styleUrls: ['./instructor-listing.component.css']
})
export class InstructorListingComponent implements OnInit {
instructors:any[]=[];
instructor:IInstructor;
index:number;
  constructor(private instructorService:InstructorService) { }

  ngOnInit() {
    this.instructorService.getInstructors().subscribe(data=>{
      this.instructors=data;
   })
  }

  add(newStudent){
    this.instructors.push(newStudent);
    console.log(this.instructors);
   }
   delete(id){
    let instructor= this.instructors.find(a=>a.Id ==id);
    var i =this.instructors.indexOf(instructor);
    this.instructors.splice(i,1);
    this.instructorService.deleteInstructor(id).subscribe();
  }

  edit(id){
    this.instructor= this.instructors.find(a=>a.Id ==id);
    this.index=this.instructors.indexOf(this.instructor);
  }
  editData(updinstructor){
    this.instructors[this.index]=updinstructor;
  }
  details(id){
    this.instructorService.getInstructorById(id).subscribe(data=>{
      this.instructor= data;
      console.log(this.instructor);
      
    });
  }
}
