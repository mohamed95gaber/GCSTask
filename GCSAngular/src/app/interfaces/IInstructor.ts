import { ICourse } from "src/app/interfaces/ICourse";
import { IStudent } from "src/app/interfaces/IStudent";

export interface IInstructor {
    Id? :number;
    Name?:string;
    Phone?:number;
    Mail?:string;
    Dept?:string;
    CoursesId?:number[];
    isDeleted?:boolean;
}
