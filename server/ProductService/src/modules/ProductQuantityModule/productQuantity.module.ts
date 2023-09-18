import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductQuantity } from './productQuantity.entity';
import { ProductQuantityService } from './productQuantity.service';
import { ProductQuantityController } from './productQuantity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductQuantity])],
  exports: [ProductQuantityService],
  controllers: [ProductQuantityController],
  providers: [ProductQuantityService],
})
export class ProductQuantityModule {}
