import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductDetailModule } from '../ProductDetail/productDetail.module';
import { CategoryModule } from '../CategoryModule/categories.module';
import { AuthModule } from '../Auth/Auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductDetailModule,
    forwardRef(() => CategoryModule),
    AuthModule,
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
