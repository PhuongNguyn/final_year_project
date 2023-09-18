import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { I18nService } from 'nestjs-i18n';
import { appConfig } from 'src/config';
import { IPaging } from 'src/interfaces';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { CategoryService } from '../CategoryModule/categories.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { IPlaceOrderInterface } from './product.interface';
import { Authorization } from 'src/decorators/authorization.decorator';
import { actionEnum } from 'src/guard/role.guard';

@Controller(`${appConfig.BASE_URL}/product`)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly i18n: I18nService,
  ) {}

  @Get('/')
  @Authorization('product', actionEnum.READ)
  async getPaging(@Query() query: IPaging & { search: string }) {
    try {
      const result = await this.productService.getPagingData({
        pageSize: Number(query.pageSize || 10),
        pageIndex: Number(query.pageIndex || 1),
        search: query.search || '',
      });
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }

  @Get('/getByCateSlug')
  async getPagingByCateSlug(
    @Query() query: IPaging & { search: string; slug: string },
  ) {
    try {
      const result = await this.productService.getPagingByCateSlug({
        slug: query.slug,
        pageSize: Number(query.pageSize || 10),
        pageIndex: Number(query.pageIndex || 1),
        search: query.search || '',
      });
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }
  @Get('/getRelative/:id')
  async getRelativeByCateSlug(
    @Param('id') postId: number,
    @Query() query: IPaging & { search: string; slug: string },
  ) {
    try {
      const result = await this.productService.getRelativeProduct({
        postId: postId,
        slug: query.slug,
        pageSize: Number(query.pageSize || 10),
        pageIndex: Number(query.pageIndex || 1),
        search: query.search || '',
      });
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }
  @Get('/getById/:id')
  async getById(@Param('id') id: number) {
    try {
      const result = await this.productService.getById(id);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }
  @Get('/getBySlug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    try {
      const result = await this.productService.getBySlug(slug);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }
  @Post('/')
  async create(@Body() body: CreateProductDTO) {
    try {
      const result = await this.productService.create(body);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDTO) {
    try {
      const result = await this.productService.update(id, body);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.productService.delete(id);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error.message,
      });
    }
  }

  @Get('/get-by-category-slug/:slug')
  async getProductByCategory(@Param('slug') slug: string, @Query() query: any) {
    try {
      const pageSize = query.pageSize ? Number(query.pageSize) : 10;
      const pageIndex = query.pageIndex ? Number(query.pageIndex) : 1;
      const arraySlug = slug?.split(',');

      const result = await this.productService.getByCategorySlug({
        slug: arraySlug,
        pageIndex,
        pageSize,
      });

      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }

  @GrpcMethod('ProductService', 'GetProductByIds')
  async getProductsByIds(data) {
    return this.productService.getProductByIds(data?.ids);
  }

  @GrpcMethod('ProductService', 'CheckStock')
  async checkStock(data: IPlaceOrderInterface) {
    return this.productService.checkStock(data);
  }

  @GrpcMethod('ProductService', 'PlaceOrder')
  async placeOrder(data: IPlaceOrderInterface[]) {
    return this.productService.placeOrder(data);
  }
}
