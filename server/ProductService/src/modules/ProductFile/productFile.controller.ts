import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { appConfig } from 'src/config';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { I18nService } from 'nestjs-i18n';
import { IPaging } from 'src/interfaces';
import { ProductFileService } from './productFile.service';

@Controller(`${appConfig.BASE_URL}/product`)
export class ProductFileController {
  constructor(
    private readonly productService: ProductFileService,
    private readonly i18n: I18nService,
  ) {}

  // @Get('/')
  // async getPaging(@Query() query: IPaging & { search: string }) {
  //   try {
  //     const result = await this.productService.getPagingData({
  //       pageSize: Number(query.pageSize || 10),
  //       pageIndex: Number(query.pageIndex || 1),
  //       search: query.search || '',
  //     });
  //     return Response({
  //       statusCode: RESPONSE_STATUS.SUCCESS,
  //       result: result,
  //     });
  //   } catch (error) {
  //     return Response({
  //       statusCode: RESPONSE_STATUS.FAILED,
  //       message: error,
  //     });
  //   }
  // }

  // @Get('/getById/:id')
  // async getById(@Param('id') id: number) {
  //   try {
  //     const result = await this.productService.getById(id);
  //     return Response({
  //       statusCode: RESPONSE_STATUS.SUCCESS,
  //       result: result,
  //     });
  //   } catch (error) {
  //     return Response({
  //       statusCode: RESPONSE_STATUS.FAILED,
  //       message: error,
  //     });
  //   }
  // }
  // @Get('/getBySlug/:slug')
  // async getBySlug(@Param('slug') slug: string) {
  //   try {
  //     const result = await this.productService.getBySlug(slug);
  //     return Response({
  //       statusCode: RESPONSE_STATUS.SUCCESS,
  //       result: result,
  //     });
  //   } catch (error) {
  //     return Response({
  //       statusCode: RESPONSE_STATUS.FAILED,
  //       message: error,
  //     });
  //   }
  // }
  // @Post('/')
  // async createWarehouse(@Body() body: CreateProductDTO) {
  //   try {
  //     const result = await this.productService.create(body);
  //     return Response({
  //       statusCode: RESPONSE_STATUS.SUCCESS,
  //       result: result,
  //     });
  //   } catch (error) {
  //     return Response({
  //       statusCode: RESPONSE_STATUS.FAILED,
  //       message: error,
  //     });
  //   }
  // }

  // @Put('/:id')
  // async updateWareHouse(
  //   @Param('id') id: number,
  //   @Body() body: UpdateProductDTO,
  // ) {
  //   try {
  //     const result = await this.productService.update(id, body);
  //     return Response({
  //       statusCode: RESPONSE_STATUS.SUCCESS,
  //       result: result,
  //     });
  //   } catch (error) {
  //     return Response({
  //       statusCode: RESPONSE_STATUS.FAILED,
  //       message: error,
  //     });
  //   }
  // }

  // @Delete('/:id')
  // async deleteUnit(@Param('id') id: number) {
  //   try {
  //     const result = await this.productService.delete(id);
  //     return Response({
  //       statusCode: RESPONSE_STATUS.SUCCESS,
  //       result: result,
  //     });
  //   } catch (error) {
  //     return Response({
  //       statusCode: RESPONSE_STATUS.FAILED,
  //       message: error,
  //     });
  //   }
  // }
}
