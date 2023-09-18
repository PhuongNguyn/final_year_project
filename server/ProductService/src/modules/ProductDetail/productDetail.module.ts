import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './productDetail.entity';
import { ProductDetailService } from './productDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail])],
  exports: [ProductDetailService],
  controllers: [],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
