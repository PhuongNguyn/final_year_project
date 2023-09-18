import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../CategoryModule/categories.entity';
import { ProductFile } from './productFile.entity';
import { ProductFileController } from './productFile.controller';
import { ProductFileService } from './productFile.service';
import { Product } from '../ProductModule/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductFile])],
  exports: [ProductFileService],
  controllers: [ProductFileController],
  providers: [ProductFileService],
})
export class ProductFileModule {}
