import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { Http,HttpModule } from '@angular/http';
import {Observable} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { CourseService } from 'src/app/services/Course.service';
import { CourseListingComponent } from 'src/app/Course/course-listing/course-listing.component';
import { CourseAddComponent } from 'src/app/Course/course-add/course-add.component';
import { StudentListingComponent } from 'src/app/Student/student-listing/student-listing.component';
import { InstructorListingComponent } from 'src/app/Instructor/instructor-listing/instructor-listing.component';
import { InstructorService } from 'src/app/services/Instructor.service';
import { StudentService } from 'src/app/services/Student.service';
import { CourseEditComponent } from 'src/app/Course/course-edit/course-edit.component';
import { StudentAddComponent } from 'src/app/Student/student-add/student-add.component';
import { InstructorAddComponent } from 'src/app/Instructor/instructor-add/instructor-add.component';
import { InstructorEditComponent } from 'src/app/Instructor/instructor-edit/instructor-edit.component';
import { StudentEditComponent } from 'src/app/Student/student-edit/student-edit.component';
import { CourseDetailsComponent } from 'src/app/Course/course-details/course-details.component';
import { InstructorDetailsComponent } from 'src/app/Instructor/instructor-details/instructor-details.component';
import { StudentDetailsComponent } from 'src/app/Student/student-details/student-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListingComponent,
    CourseAddComponent,
    CourseEditComponent,
    InstructorListingComponent,
    StudentListingComponent,
    StudentAddComponent,
    InstructorAddComponent,
    InstructorEditComponent,
    StudentEditComponent,
    CourseDetailsComponent,
    InstructorDetailsComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'courses', component:CourseListingComponent },
      { path: 'instructors', component:InstructorListingComponent },
      { path: 'students', component:StudentListingComponent },      
      { path: '', component:CourseListingComponent },
    ]),
  ],
  providers: [CourseService,InstructorService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
