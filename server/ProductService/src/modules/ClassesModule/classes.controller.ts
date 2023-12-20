import { Controller } from "@nestjs/common";
import { ClassesService } from "./classes.service";


@Controller()
export class ClassesController{
    constructor(private readonly classesService: ClassesService){
        
    }
}