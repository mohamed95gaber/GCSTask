import { Component, OnInit,Input } from '@angular/core';
import { IInstructor } from 'src/app/interfaces/IInstructor';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit {
@Input() instructor:IInstructor;
  constructor() { }

  ngOnInit() {
    if (this.instructor == undefined) {
      this.instructor = {};
    }
  }

  ok() {
    this.instructor = {};
  }

}
