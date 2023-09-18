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
import { appConfig } from 'src/config';
import { I18nService } from 'nestjs-i18n';
import { CategoryService } from './categories.service';
import { IPaging } from 'src/interfaces';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateDTO } from './dto/updateCategory.dto';

@Controller(`${appConfig.BASE_URL}/categories`)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
  ) {}

  @Get('/')
  async getPaging(@Query() query: IPaging & { search: string }) {
    try {
      const result = await this.categoryService.getPagingCategory({
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
      const result = await this.categoryService.getCategoryById(id);
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
      const result = await this.categoryService.getCategoryBySlug(slug);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        result: error,
      });
    }
  }

  @Post('/')
  async createCategory(@Body() body: CreateCategoryDTO) {
    try {
      const result = await this.categoryService.createCategory(body);
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
  async updateCategory(@Param('id') id: number, @Body() body: UpdateDTO) {
    try {
      const result = await this.categoryService.updateCategory(id, body);
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
  async deleteCategory(@Param('id') id: number) {
    try {
      const result = await this.categoryService.deleteCategory(id);
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

  @Get('/get-all')
  async getAllCategory() {
    try {
      const result = await this.categoryService.getAll();
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

  @Get('/getCateHome')
  async getCateHomeAndProduct() {
    try {
      const result = await this.categoryService.getHomeCateAndProduct();
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
}
