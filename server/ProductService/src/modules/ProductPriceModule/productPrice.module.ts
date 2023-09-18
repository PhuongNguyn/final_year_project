import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from './productPrice.entity';
import { ProductPriceService } from './productPrice.service';
import { ProductPriceController } from './productPrice.controller';
import { Unit } from '../Unit/unit.entity';
import { Product } from '../ProductModule/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPrice])],
  exports: [ProductPriceService],
  controllers: [ProductPriceController],
  providers: [ProductPriceService],
})
export class ProductPriceModule {}
