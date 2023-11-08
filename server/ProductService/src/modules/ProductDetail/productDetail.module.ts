import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './productDetail.entity';
import { ProductDetailService } from './productDetail.service';
import { ProductDetailController } from './productDetail.controller';
import { Product } from '../ProductModule/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail]), TypeOrmModule.forFeature([Product])],
  exports: [ProductDetailService],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule { }
