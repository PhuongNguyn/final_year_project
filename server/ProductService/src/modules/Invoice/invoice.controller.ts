import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common";
import { appConfig } from "src/config";
import { IPaging } from "src/interfaces";
import { InvoiceServices } from "./invoice.service";
import { Authentication } from "src/decorators/authentication.decorator";
import { momoPay } from "src/utils/momoPay";


@Controller(`${appConfig.BASE_URL}/invoices`)
export class InvoiceController {
    constructor(private readonly invoiceServices: InvoiceServices) {

    }

    @Post('/momo')
    @Authentication()
    async createInvoice(@Body() body: any, @Request() req: any){
        try {
            const dataToAdd = {
                ...body, 
                user: req.user?.id,
                products: body?.products?.map(item => {return {id: item.id}})
            }

            const newInvoice = await this.invoiceServices.createInvoice(dataToAdd)

            //@ts-ignore
            const momoUrl = await momoPay(body?.total, `Thanh toán cho hoá đơn ${newInvoice.id}`, req.user?.id, newInvoice?.id)

            return momoUrl
        } catch (error) {
            throw error
        }
    }

    @Put('/pay-result/:invoiceId')
    @Authentication()
    async momoPayResult(@Param("invoiceId") id: number, @Body() body: any){
        try {   
            const status = body.status
            console.log(status)
            if(status == "0"){  
                const result = await this.invoiceServices.updateInvoiceStatus(id,true)
            }

            return true
        } catch (error) {
            throw error
        }
    }

    @Get('/my-course')
    @Authentication()
    async getMyCourse(@Request() req: any){
        try {
            const userId = req.user?.id
            const result = await this.invoiceServices.myCourse(userId)

            return {courses: result}
        } catch (error) {
            throw error
        }
    }

}
