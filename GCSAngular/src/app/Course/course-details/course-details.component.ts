import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from 'src/app/interfaces/ICourse';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  @Input() course: ICourse;


  constructor() { }

  ngOnInit() {
    if (this.course == undefined) {
      this.course = {};
    }
  }
  ok() {
    this.course = {};
  }
}
