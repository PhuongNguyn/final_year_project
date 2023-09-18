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
import { ProductQuantityService } from './productQuantity.service';
import { createDTO, updateDTO } from './dto/dto';

@Controller(`${appConfig.BASE_URL}/quantity`)
export class ProductQuantityController {
  constructor(
    private readonly productQuantityService: ProductQuantityService,
    private readonly i18n: I18nService,
  ) {}

  @Post('/')
  async createQuantity(@Body() body: createDTO) {
    try {
      const result = await this.productQuantityService.create(body);

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

  @Get('/')
  async getPaging(
    @Query() query: IPaging & { search: string; warehouse: number },
  ) {
    try {
      const result = await this.productQuantityService.getPagingData({
        pageSize: Number(query.pageSize || 10),
        pageIndex: Number(query.pageIndex || 1),
        search: query.search || '',
        warehouseId: query.warehouse || null,
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

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: updateDTO) {
    try {
      const result = await this.productQuantityService.update(id, body);
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

  // @Delete('/:id')
  // async deleteUnit(@Param('id') id: number) {
  //   try {
  //     const result = await this.wareHouseService.delete(id);
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
