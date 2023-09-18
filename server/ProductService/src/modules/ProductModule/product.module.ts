import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductQuantityModule } from '../ProductQuantityModule/productQuantity.module';
import { ProductFileModule } from '../ProductFile/productFile.module';
import { ProductDetailModule } from '../ProductDetail/productDetail.module';
import { CategoryModule } from '../CategoryModule/categories.module';
import { AuthModule } from '../Auth/Auth.module';
import { ProductPriceModule } from '../ProductPriceModule/productPrice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductQuantityModule,
    ProductFileModule,
    ProductDetailModule,
    forwardRef(() => CategoryModule),
    AuthModule,
    ProductPriceModule,
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
