import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { ProductDetail } from './productDetail.entity';

@Injectable()
export class ProductDetailService extends BaseService<ProductDetail> {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly detailReponsitory: Repository<ProductDetail>,
  ) {
    super(detailReponsitory);
  }
  async createDetail(body: any) {
    try {
      const result = await this.detailReponsitory.save(body);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateDetail(id: number, body: any) {
    try {
      const result = await this.detailReponsitory.update(id, body);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteDetail(id: number) {
    try {
      const result = await this.detailReponsitory.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getDetailById(id: number) {
    try {
      const result = await this.detailReponsitory.findOne({
        where: { id: id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  // async getDetailByProductId(productId: number) {
  //   try {
  //     const result = await this.detailReponsitory.find({
  //       where: { product.: productId },
  //     });
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

