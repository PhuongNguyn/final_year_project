import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { appConfig } from 'src/config';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { I18nService } from 'nestjs-i18n';
import { IPaging } from 'src/interfaces';
import { WarehouseService } from './warehouse.service';
import { CreateWareHouseDto, UpdateWareHouseDto } from './dto/create.dto';

@Controller(`${appConfig.BASE_URL}/warehouse`)
export class WareHouseController {
  constructor(
    private readonly wareHouseService: WarehouseService,
    private readonly i18n: I18nService,
  ) {}

  @Get('/get-all')
  async getAllWarehouse() {
    try {
      const result = await this.wareHouseService.getAll();
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
      });
    } catch (error) {
      console.log(error);
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }

  @Get('/')
  async getPaging(@Query() query: IPaging & { search: string }) {
    try {
      const result = await this.wareHouseService.getPagingData({
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

  @Post('/')
  async createWarehouse(@Body() body: CreateWareHouseDto) {
    try {
      const result = await this.wareHouseService.create(body);
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: result,
        message: 'Success',
      });
    } catch (error) {
      return Response({
        statusCode: RESPONSE_STATUS.FAILED,
        message: error,
      });
    }
  }

  @Put('/:id')
  async updateWareHouse(
    @Param('id') id: number,
    @Body() body: UpdateWareHouseDto,
  ) {
    try {
      const result = await this.wareHouseService.update(id, body);
      console.log(result);
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
  async deleteUnit(@Param('id') id: number) {
    try {
      const result = await this.wareHouseService.delete(id);
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
