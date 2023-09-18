import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseService } from './warehouse.service';
import { WareHouseController } from './warehouse.controller';
import { Warehouse } from './warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  exports: [WarehouseService],
  controllers: [WareHouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
