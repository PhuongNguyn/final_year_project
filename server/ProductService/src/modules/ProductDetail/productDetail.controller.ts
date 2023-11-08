import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { appConfig } from "src/config";
import { IPaging } from "src/interfaces";
import { ProductDetailService } from "./productDetail.service";
import { IProductDetail } from "./ProductDetailDTO";


@Controller(`${appConfig.BASE_URL}/lessons`)
export class ProductDetailController {

    constructor(private readonly productDetailService: ProductDetailService) {

    }

    @Delete('/:id')
    async deleteLesson(@Param("id") id: number) {
        try {
            const result = await this.productDetailService.deleteLesson(id)

            return result
        } catch (error) {
            throw error
        }
    }

    @Put('/:id')
    async updateLesson(@Param("id") id: number, @Body() body: IProductDetail) {
        try {
            const result = await this.productDetailService.updateLesson(id, body)

            return result
        } catch (error) {
            throw error
        }
    }

    @Post('/')
    async createLesson(@Body() body: IProductDetail) {
        try {
            const result = await this.productDetailService.createLesson(body)

            return result
        } catch (error) {
            throw error
        }
    }

    @Get('/getPaging')
    async getPaging(@Query() query: IPaging & { search: string }) {
        try {
            const result = await this.productDetailService.getPagingLesson(Number(query.pageSize || 10), Number(query.pageIndex || 10), query.search || "")

            return result
        } catch (error) {
            throw error
        }
    }

    @Get('/get-by-course/:courseId')
    async getByCourseId(@Param("courseId") courseId) {
        try {
            const result = await this.productDetailService.getLessonsByCourse(courseId)

            return result
        } catch (error) {
            throw error
        }
    }

    @Get('/:id')
    async getLesson(@Param("id") id) {
        try {
            const result = await this.productDetailService.getLesson(id)

            return result
        } catch (error) {
            throw error
        }
    }
}
