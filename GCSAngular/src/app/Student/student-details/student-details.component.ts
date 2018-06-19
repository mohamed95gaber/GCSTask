import { Component, OnInit ,Input } from '@angular/core';
import { ICourse } from 'src/app/interfaces/ICourse';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
@Input() student:ICourse;
  constructor() { }

  ngOnInit() {
    if (this.student == undefined) {
      this.student = {};
    }
  }
  ok() {
    this.student = {};
  }
}
