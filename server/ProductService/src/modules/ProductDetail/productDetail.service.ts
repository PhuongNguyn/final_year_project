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

  async createOrUpdateDetails(productId: number, data: any) {
    try {
      await this.detailReponsitory.upsert({ ...data, productId }, [
        'productId',
      ]);
    } catch (error) {}
  }

  async updateView(productId: number, view: number) {
    const data = await this.detailReponsitory.upsert(
      {
        productId: productId,
        view: !isNaN(view) ? view : 1,
      },
      ['productId'],
    );
  }

  async updateLiked(productId: number, liked: number) {
    const data = await this.detailReponsitory.upsert(
      {
        productId: productId,
        liked: !isNaN(liked) ? liked : 1,
      },
      ['productId'],
    );
  }

  async updateRated(productId: number, rated: number) {
    const data = await this.detailReponsitory.upsert(
      {
        productId: productId,
        rated: !isNaN(rated) ? rated : 1,
      },
      ['productId'],
    );
  }
  async updateOrdered(productId: number, ordered: number) {
    const data = await this.detailReponsitory.upsert(
      {
        productId: productId,
        ordered: !isNaN(ordered) ? ordered : 1,
      },
      ['productId'],
    );
  }
}
