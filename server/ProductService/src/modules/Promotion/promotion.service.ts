import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { Promotion } from './promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDTO } from './PromotionDTO/createPromotion.dto';

@Injectable()
export class PromotionService extends BaseService<Promotion> {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionEntity: Repository<Promotion>,
  ) {
    super(promotionEntity);
  }

  async createPomotion(data: CreatePromotionDTO) {
    try {
      const result = this.promotionEntity.create(data);
      const promotion = await this.promotionEntity.save(result);

      return promotion;
    } catch (error) {
      throw error;
    }
  }
  async getPagingPromotion({
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
      const users = await this.promotionEntity.find({
        where: searchQuery,
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
      });
      const totalDocs = await this.promotionEntity.count();
      return {
        users,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }
}
