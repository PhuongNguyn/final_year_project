import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPrice } from './productPrice.entity';
import {
  CreateProductPriceDTO,
  updateProductPriceDTO,
} from './dto/productPrice.dto';
import { createDTO } from '../ProductQuantityModule/dto/dto';

@Injectable()
export class ProductPriceService extends BaseService<ProductPrice> {
  constructor(
    @InjectRepository(ProductPrice)
    private readonly productPriceReponsitory: Repository<ProductPrice>,
  ) {
    super(productPriceReponsitory);
  }

  async createProductPrice(productId: number, data: CreateProductPriceDTO[]) {
    try {
      const createPrice = await Promise.all(
        data.map(async (item) => {
          const checkExists = await this.productPriceReponsitory.findOne({
            where: { productId, unitId: item?.unit },
          });
          if (checkExists) {
            return;
          }
          const result = await this.productPriceReponsitory.create({
            product: {
              id: productId,
            },
            price: item.price,
            fakePrice: item.fakePrice,
            unit: { id: item.unit },
          });
          const newPrice = await this.productPriceReponsitory.save(result);

          return newPrice;
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  async updateProductPrice(id: number, data: updateProductPriceDTO) {
    try {
      const result = await this.productPriceReponsitory.update(id, data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteProductPrice(productPriceId: number) {
    try {
      const result = await this.productPriceReponsitory.delete(productPriceId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProductPriceByProduct(productId: number) {
    try {
      const result = await this.productPriceReponsitory.find({
        where: { productId: productId },
        relations: { unit: true, product: true },
        select: ['id', 'price', 'unit', 'productId'],
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createOrUpdatePrice(productId: number, data: any[]) {
    try {
      await Promise.all(
        data?.map(async (item) => {
          await this.productPriceReponsitory.upsert({ ...item, productId }, [
            'productId',
            'unitId',
          ]);
        }),
      );
    } catch (error) {}
  }
}
