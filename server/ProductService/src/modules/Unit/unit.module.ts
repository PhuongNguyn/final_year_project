import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './unit.entity';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  exports: [UnitService],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
