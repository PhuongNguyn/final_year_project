import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoices } from "./invoice.entity";
import { InvoiceController } from "./invoice.controller";
import { InvoiceServices } from "./invoice.service";
import { AuthModule } from "../Auth/Auth.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Invoices]),
        AuthModule
    ],
    providers: [InvoiceServices],
    controllers: [InvoiceController],
    exports: []
})
export class InvoiceModule{}