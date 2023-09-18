import { Injectable } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SELECT_SINGLE_PRODUCT_CONSTANT } from 'src/constant/global.constant';
import { ProductFile, fileRole } from './productFile.entity';

@Injectable()
export class ProductFileService extends BaseService<ProductFile> {
  constructor(
    @InjectRepository(ProductFile)
    private readonly productFileReponsitory: Repository<ProductFile>,
  ) {
    super(productFileReponsitory);
  }

  async createOrUpdateFile(productId: number, data: any[]) {
    try {
      await Promise.all(
        data?.map(async (item) => {
          await this.productFileReponsitory.upsert(
            { ...item, product: productId },
            ['link'],
          );
        }),
      );
    } catch (error) {}
  }

  async createFile(
    file: { image: string; type: fileRole }[],
    productId: number,
  ) {
    try {
      const result = await Promise.all(
        file.map(async (item) => {
          const newFile = await this.productFileReponsitory.insert({
            name: item.image.replace(process.env.CDN_URL, ''),
            link: item.image,
            role: item.type,
            product: {
              id: productId,
            },
          });
          return newFile;
        }),
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  //   async getPagingData({
  //     pageSize,
  //     pageIndex,
  //     search,
  //   }: {
  //     pageSize: number;
  //     pageIndex: number;
  //     search: string;
  //   }) {
  //     try {
  //       let searchQuery = {};

  //       if (search) {
  //         searchQuery = {
  //           ...searchQuery,
  //           name: `%${search}%`,
  //         };
  //       }
  //       const [data, totalDocs] = await this.productReponsitory.findAndCount({
  //         where: searchQuery,
  //         skip: pageSize * pageIndex - pageSize,
  //         take: pageSize,
  //         relations: ['category', 'price', 'price.unit'],
  //         order: {
  //           createdAt: 'DESC',
  //         },
  //         select: {
  //           id: true,
  //           name: true,
  //           slug: true,
  //           createdAt: true,
  //           category: {
  //             id: true,
  //             name: true,
  //             slug: true,
  //           },
  //           price: {
  //             id: true,
  //             price: true,
  //             unit: {
  //               id: true,
  //               name: true,
  //             },
  //           },
  //         },
  //       });

  //       return {
  //         data: data,
  //         totalDoc: totalDocs,
  //         totalPage: Math.ceil(totalDocs / pageSize),
  //       };
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  //   async getAllData(search?: string) {
  //     try {
  //       let searchQuery = {};
  //       if (search) {
  //         searchQuery = {
  //           ...searchQuery,
  //           name: `%${search}%`,
  //         };
  //       }
  //       const data = await this.productReponsitory.find({ where: searchQuery });
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  //   async getById(id: number) {
  //     try {
  //       const data = await this.productReponsitory.findOne({
  //         where: { id },
  //         relations: [
  //           'category',
  //           'price',
  //           'price.unit',
  //           'quantity',
  //           'quantity.unit',
  //           'quantity.warehouse',
  //         ],
  //         select: SELECT_SINGLE_PRODUCT_CONSTANT,
  //       });
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  //   async getBySlug(slug: string) {
  //     try {
  //       const data = await this.productReponsitory.findOne({
  //         where: { slug },
  //         relations: [
  //           'category',
  //           'price',
  //           'price.unit',
  //           'quantity',
  //           'quantity.unit',
  //           'quantity.warehouse',
  //         ],
  //         select: SELECT_SINGLE_PRODUCT_CONSTANT,
  //       });
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  //   async create(data: CreateProductDTO) {
  //     try {
  //       const checkExists = await this.productReponsitory.findOne({
  //         where: [{ name: data?.name }, { slug: data?.slug }],
  //       });

  //       if (checkExists) {
  //         return { success: false, message: 'Sản phẩm đã tồn tại!' };
  //       }
  //       const result = await this.productReponsitory.create(data);
  //       await this.productReponsitory.save(result);
  //       return {
  //         success: true,
  //         result,
  //         message: 'Tạo sản phẩm thành công!',
  //       };
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async update(id: number, data: UpdateProductDTO) {
  //     try {
  //       const { price, quantity, ...product } = { ...data };
  //       console.log(price, quantity);
  //       await this.productReponsitory.update(id, product);
  //       return {
  //         success: true,
  //         message: 'Cập nhật sản phẩm thành công!',
  //         result: await this.productReponsitory.findOne({ where: { id } }),
  //       };
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  //   async delete(id: number) {
  //     try {
  //       return this.productReponsitory.delete(id);
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }
}
