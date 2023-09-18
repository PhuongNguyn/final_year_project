import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
import { CreateUnitDTO } from './dto/create.dto';

@Injectable()
export class UnitService extends BaseService<Unit> {
  constructor(
    @InjectRepository(Unit)
    private readonly unitReponsitory: Repository<Unit>,
  ) {
    super(unitReponsitory);
  }

  async getById(id: number) {
    return this.unitReponsitory.findOneBy({ id });
  }

  async getPagingUnit({
    pageSize,
    pageIndex,
    search,
  }: {
    pageSize: number;
    pageIndex: number;
    search: string;
  }) {
    try {
      let searchQuery = {};

      if (search) {
        searchQuery = {
          ...searchQuery,
          name: `%${search}%`,
        };
      }
      const [units, totalDocs] = await this.unitReponsitory.findAndCount({
        where: searchQuery,
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        // relations: { cate: true },
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        data: units,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }

  async createUnit(data: CreateUnitDTO) {
    try {
      const result = this.unitReponsitory.create(data);
      await this.unitReponsitory.save(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteUnit(id: number) {
    return this.unitReponsitory.delete(id);
  }

  async updateUnit(id: number, data: CreateUnitDTO) {
    return this.unitReponsitory.update({ id }, data);
  }
}
