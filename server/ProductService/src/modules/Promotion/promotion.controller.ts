import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { appConfig } from 'src/config';
import { PromotionService } from './promotion.service';
import { CreatePromotionDTO } from './PromotionDTO/createPromotion.dto';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { I18nService } from 'nestjs-i18n';
import { IPaging } from 'src/interfaces';

@Controller(`${appConfig.BASE_URL}/promotions`)
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  async createPromotion(@Body() body: CreatePromotionDTO) {
    try {
      const result = await this.promotionService.createPomotion(body);

      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        message: this.i18n.t('response.CREATE_PROMOTION_SUCCESS'),
        result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/get-paging')
  async getPaging(@Query() query: IPaging & { search: string }) {
    try {
      const promotions = await this.promotionService.getPagingPromotion({
        pageSize: Number(query.pageSize || 10),
        pageIndex: Number(query.pageIndex || 1),
        search: query.search || '',
      });
      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: promotions,
      });
    } catch (error) {
      throw error;
    }
  }
}
