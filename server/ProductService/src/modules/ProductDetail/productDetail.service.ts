import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { ProductDetail } from './productDetail.entity';
import { IProductDetail } from './ProductDetailDTO';

@Injectable()
export class ProductDetailService extends BaseService<ProductDetail> {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly detailReponsitory: Repository<ProductDetail>,
  ) {
    super(detailReponsitory);
  }

  async deleteLesson(id: number) {
    try {
      const result = await this.detailReponsitory.delete({ id })

      return result
    } catch (error) {
      throw error
    }
  }

  async getLesson(id: number) {
    try {
      const result = await this.detailReponsitory.findOne({ where: { id }, relations: { product: true } })

      return result
    } catch (error) {
      throw error
    }
  }

  async createLesson(data: IProductDetail) {
    try {
      const { productId, isFree, ...submitData } = data
      let convertToIsFree = isFree == "true" ? true : false

      const result = this.detailReponsitory.create({ isFree: convertToIsFree, product: { id: productId }, ...submitData })
      await result.save()

      return result
    } catch (error) {
      throw error
    }
  }

  async updateLesson(id: number, data: IProductDetail) {
    try {
      const { productId, isFree, ...submitData } = data
      let convertToIsFree = isFree == "true" || isFree == true ? true : false
      console.log(data)
      const result = await this.detailReponsitory.update({ id }, { isFree: convertToIsFree, product: { id: productId }, ...submitData })

      return result
    } catch (error) {
      throw error
    }
  }

  async getPagingLesson(pageSize: number, pageIndex: number, search: string) {
    try {
      const result = await this.detailReponsitory.find({ relations: { product: true }, skip: pageSize * pageIndex - pageSize, take: pageSize })
      const count = await this.detailReponsitory.count()
      const totalPage = Math.ceil(count / pageSize)

      return {
        lessons: result,
        count,
        totalPage
      }
    } catch (error) {
      throw error
    }
  }

  async getLessonsByCourse(id: number) {
    try {
      const result = await ProductDetail.find({ where: { product: { id } }, order: { ordered: 1 }, relations: { product: true } })

      return result
    } catch (error) {
      throw error
    }
  }
}
