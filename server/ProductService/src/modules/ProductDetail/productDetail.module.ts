import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './productDetail.entity';
import { ProductDetailService } from './productDetail.service';
import { ProductDetailController } from './productDetail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail])],
  exports: [ProductDetailService],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule { }
