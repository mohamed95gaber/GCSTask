import { ICourse } from "src/app/interfaces/ICourse";
import { IInstructor } from "src/app/interfaces/IInstructor";

export interface IStudent {
    Id? :number;
    Name?:string;
    Phone?:number;
    Mail?:string;
    Birthdate?:Date;
    Courses?:ICourse[];
    Instructors?:IInstructor[];
    isDeleted?:boolean;
    
}
