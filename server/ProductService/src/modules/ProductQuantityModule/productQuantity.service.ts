import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductQuantity } from './productQuantity.entity';
import { createDTO, updateDTO } from './dto/dto';

@Injectable()
export class ProductQuantityService extends BaseService<ProductQuantity> {
  constructor(
    @InjectRepository(ProductQuantity)
    private readonly productQuantityReponsitory: Repository<ProductQuantity>,
  ) {
    super(productQuantityReponsitory);
  }

  async getPagingData({
    pageSize,
    pageIndex,
    search,
    warehouseId,
  }: {
    pageSize: number;
    pageIndex: number;
    search: string;
    warehouseId: number | null;
  }) {
    try {
      let searchQuery = {};

      if (search) {
        searchQuery = {
          ...searchQuery,
          name: `%${search}%`,
        };
      }

      if (warehouseId) {
        searchQuery = {
          ...searchQuery,
          warehouse: { id: warehouseId },
        };
      }

      const [data, totalDocs] =
        await this.productQuantityReponsitory.findAndCount({
          where: searchQuery,
          skip: pageSize * pageIndex - pageSize,
          take: pageSize,
          relations: { unit: true, warehouse: true, product: true },
          order: {
            createdAt: 'DESC',
          },
        });

      return {
        data: data,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllData(search?: string) {
    try {
      let searchQuery = {};
      if (search) {
        searchQuery = {
          ...searchQuery,
          name: `%${search}%`,
        };
      }
      const data = await this.productQuantityReponsitory.find({
        where: searchQuery,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const data = await this.productQuantityReponsitory.find({
        where: { id },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: createDTO) {
    try {
      const result = this.productQuantityReponsitory.create({
        product: { id: data.product },
        unit: { id: data.unit },
        warehouse: { id: data.warehouse },
        quantity: data.quantity,
      });
      await result.save();

      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: updateDTO) {
    try {
      const result = await this.productQuantityReponsitory.update(id, data);
      return { success: true, message: 'Cập nhật thành công!' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return this.productQuantityReponsitory.delete(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createOrUpdateQuantity(productId: number, data: any[]) {
    try {
      await Promise.all(
        data?.map(async (item) => {
          await this.productQuantityReponsitory.upsert({ ...item, productId }, [
            'productId',
            'unitId',
            'warehouseId',
          ]);
        }),
      );
    } catch (error) {}
  }

  async subtractOrPlusQuantity(quantityId: number, quantity: number) {
    try {
      const data = await this.productQuantityReponsitory.findOne({
        where: { id: quantityId },
      });
      if (data.quantity === 0 || data.quantity < quantity) {
        return false;
      } else {
        data.quantity = data.quantity + quantity;
        await data.save();
        return true;
      }
    } catch (error) {}
  }
}
