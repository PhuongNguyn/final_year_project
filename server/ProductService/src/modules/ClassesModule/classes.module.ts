import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassesEntity } from "./classes.entity";
import { ClassesService } from "./classes.service";
import { ClassesController } from "./classes.controller";
import { CategoryModule } from "../CategoryModule/categories.module";


@Module({
    imports: [TypeOrmModule.forFeature([ClassesEntity]), CategoryModule],
    exports: [ClassesService],
    providers: [ClassesService],
    controllers: [ClassesController]
})
export class ClassesModule{}