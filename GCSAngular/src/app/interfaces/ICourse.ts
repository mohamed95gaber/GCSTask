import { IInstructor } from "src/app/interfaces/IInstructor";
import { IStudent } from "src/app/interfaces/IStudent";

export interface ICourse {
    Id? :number;
    Code? :number;
    Name ?:string;
    Hours?:number;
    isDeleted?:false;
    InstructorsName?:string[];
    StudentsName?:string[];
    InstructorsId?:number[];
    StudentsId?:number[];   
}
