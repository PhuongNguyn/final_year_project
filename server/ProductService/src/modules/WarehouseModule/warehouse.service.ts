import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { CreateWareHouseDto, UpdateWareHouseDto } from './dto/create.dto';

@Injectable()
export class WarehouseService extends BaseService<Warehouse> {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseReponsitory: Repository<Warehouse>,
  ) {
    super(warehouseReponsitory);
  }

  async getPagingData({
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
      const [data, totalDocs] = await this.warehouseReponsitory.findAndCount({
        where: searchQuery,
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        // relations: { cate: true },
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
      const data = await this.warehouseReponsitory.find({ where: searchQuery });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const data = await this.warehouseReponsitory.find({ where: { id } });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: CreateWareHouseDto) {
    try {
      const checkExists = await this.warehouseReponsitory.findOne({
        where: [
          { name: data?.name },
          { address: data?.address },
          // { iat: data?.iat, long: data?.long },
        ],
      });
      if (checkExists) {
        return { success: false, message: 'Kho đã tồn tại!' };
      }
      const result = await this.warehouseReponsitory.create(data);
      await this.warehouseReponsitory.save(result);
      return { success: true, message: result };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UpdateWareHouseDto) {
    try {
      //check đổi địa chỉ kho thì cần check lại còn sản phẩm trong kho không !
      const newData = new Warehouse();
      newData.name = data.name;
      newData.address = data.address;
      // newData.iat = data.iat;
      // newData.long = data.long;
      // newData.manager = data.manager;
      newData.id = id;
      await this.warehouseReponsitory.update(id, newData);
      return newData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      //xóa kho thì cần check lại còn sản phẩm trong kho không !
      return this.warehouseReponsitory.delete(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
