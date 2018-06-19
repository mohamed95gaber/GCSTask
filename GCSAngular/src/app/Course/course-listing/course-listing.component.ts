import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/Course.service';
import { ICourse } from 'src/app/interfaces/ICourse';

@Component({
  selector: 'app-course-listing',
  templateUrl: './course-listing.component.html',
  styleUrls: ['./course-listing.component.css']
})
export class CourseListingComponent implements OnInit {
courses:any[]=[];
course:any;
index:number;
  constructor(public CourseService:CourseService) { }

  ngOnInit() {
    this.CourseService.getCourses().subscribe(data=>{
      this.courses=data;
    });
    if(this.course ==undefined){
      this.course={};
    }
  }
  delete(id){
    let course= this.courses.find(a=>a.Id ==id);
    var i =this.courses.indexOf(course);
    this.courses.splice(i,1);
    this.CourseService.deleteCourse(id).subscribe();
  }
  add(newCourse){
     this.courses.push(newCourse);
 
  }
   
  edit(id){
    this.course= this.courses.find(a=>a.Id ==id);
    this.index=this.courses.indexOf(this.course);
    
  }
  editData(updcourse){
    this.courses[this.index]=updcourse;
  }
  details(id){
    this.CourseService.getCourseById(id).subscribe(data=>{
      this.course= data;
    });
  }


}
