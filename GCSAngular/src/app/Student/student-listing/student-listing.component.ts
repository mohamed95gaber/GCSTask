import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/interfaces/IStudent';
import { StudentService } from 'src/app/services/Student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.css']
})
export class StudentListingComponent implements OnInit {
students:IStudent[]=[];
student:IStudent;
index:number;
  constructor(private StudentService:StudentService, private router:Router) { }

  ngOnInit() {
    this.StudentService.getStudents().subscribe(data=>{
      this.students=data;
    });
  }
  add(newStudent){
    this.students.push(newStudent);
    console.log(this.students);
   }
   delete(id){
    let student= this.students.find(a=>a.Id ==id);
    var i =this.students.indexOf(student); 
    this.students.splice(i,1);
    this.StudentService.deleteStudent(id).subscribe();
  }
  edit(id){
    this.student= this.students.find(a=>a.Id ==id);
    this.index=this.students.indexOf(this.student);
  }
  editData(updinstructor){
    this.students[this.index]=updinstructor;
  }
  details(id){
    this.StudentService.getStudentById(id).subscribe(data=>{
      this.student= data;
    });
  }
}
