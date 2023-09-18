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
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { I18nService } from 'nestjs-i18n';
import { IPaging } from 'src/interfaces';
import { UnitService } from './unit.service';
import { CreateUnitDTO } from './dto/create.dto';

@Controller(`${appConfig.BASE_URL}/unit`)
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly i18n: I18nService,
  ) {}

  @Get('/')
  async getPaging(@Query() query: IPaging & { search: string }) {
    try {
      const result = await this.unitService.getPagingUnit({
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
      const result = await this.unitService.getById(id);
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
  async createUnit(@Body() body: CreateUnitDTO) {
    try {
      const result = await this.unitService.createUnit(body);
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
  async editUnit(@Param('id') id: number, @Body() data: CreateUnitDTO) {
    try {
      const result = await this.unitService.updateUnit(id, data);

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

  @Delete('/:id')
  async deleteUnit(@Param('id') id: number) {
    try {
      const result = await this.unitService.deleteUnit(id);
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

  @Get('/get-all-unit')
  async getAllUit() {
    try {
      const result = await this.unitService.getAll();

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
