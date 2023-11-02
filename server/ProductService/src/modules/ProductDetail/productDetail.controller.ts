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
  import { Authorization } from 'src/decorators/authorization.decorator';
  import { actionEnum } from 'src/guard/role.guard';
  import { ProductDetailService } from './productDetail.service';
  
  @Controller(`${appConfig.BASE_URL}/product`)
  export class ProductController {
    constructor(
      private readonly productDetailService: ProductDetailService,
      private readonly i18n: I18nService,
    ) { }
    
  
   
  }
  