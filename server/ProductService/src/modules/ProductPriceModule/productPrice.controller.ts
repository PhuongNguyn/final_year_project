import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { appConfig } from 'src/config';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { I18nService } from 'nestjs-i18n';
import { IPaging } from 'src/interfaces';
import { ProductPriceService } from './productPrice.service';
import {
  CreateProductPriceDTO,
  updateProductPriceDTO,
} from './dto/productPrice.dto';

@Controller(`${appConfig.BASE_URL}/productPrice`)
export class ProductPriceController {
  constructor(
    private readonly productPriceService: ProductPriceService,
    private readonly i18n: I18nService,
  ) {}

  @Get('/getByProduct/:productId')
  getProductPriceByProduct(@Param('productId') id: number) {
    return this.productPriceService.getProductPriceByProduct(id);
  }

  @Put('/:id')
  updateProductPrice(
    @Param('id') id: number,
    @Body() body: updateProductPriceDTO,
  ) {
    return this.productPriceService.updateProductPrice(id, body);
  }

  @Delete('/:id')
  deleteProductPrice(@Param('id') id: number) {
    return this.productPriceService.deleteProductPrice(id);
  }
}
