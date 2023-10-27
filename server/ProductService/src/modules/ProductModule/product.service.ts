import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import {
  SELECT_PAGING_PRODUCT_CONSTANT,
  SELECT_SINGLE_PRODUCT_CONSTANT,
} from 'src/constant/global.constant';
import { ProductDetailService } from '../ProductDetail/productDetail.service';
import { CategoryService } from '../CategoryModule/categories.service';
import { IPlaceOrderInterface } from './product.interface';
@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productReponsitory: Repository<Product>,
    private readonly detailService: ProductDetailService,
    @Inject(forwardRef(() => CategoryService))
    private readonly cateService: CategoryService,
  ) {
    super(productReponsitory);
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
      const [data, totalDocs] = await this.productReponsitory.findAndCount({
        where: { ...searchQuery },
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        relations: ['category', 'file'],
        order: {
          createdAt: 'DESC',
        },
        select: SELECT_PAGING_PRODUCT_CONSTANT,
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
  async getPagingByCateSlug({
    slug,
    pageSize,
    pageIndex,
    search,
  }: {
    slug: string;
    pageSize: number;
    pageIndex: number;
    search: string;
  }) {
    try {
      let searchQuery = {};
      const category = await this.cateService.getCategoryBySlug(slug);
      if (category.success) {
        searchQuery = {
          category: category.data.id,
        };
      } else {
        return { success: false, message: 'Chuyên mục không tồn tại!' };
      }

      if (search) {
        searchQuery = {
          ...searchQuery,
          name: `%${search}%`,
        };
      }

      const [data, totalDocs] = await this.productReponsitory.findAndCount({
        where: { ...searchQuery },
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        relations: ['category', 'price', 'price.unit', 'file'],
        order: {
          createdAt: 'DESC',
        },
        select: SELECT_PAGING_PRODUCT_CONSTANT,
      });

      return {
        data: data,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }
  async getRelativeProduct({
    postId,
    slug,
    pageSize,
    pageIndex,
    search,
  }: {
    postId: number;
    slug: string;
    pageSize: number;
    pageIndex: number;
    search: string;
  }) {
    try {
      let searchQuery = {};
      const category = await this.cateService.getCategoryBySlug(slug);
      if (category.success) {
        searchQuery = {
          category: category.data.id,
        };
      } else {
        return { success: false, message: 'Chuyên mục không tồn tại!' };
      }
      if (postId) {
        searchQuery = { ...searchQuery, id: Not(postId) };
      }

      if (search) {
        searchQuery = {
          ...searchQuery,
          name: `%${search}%`,
        };
      }
      const [data, totalDocs] = await this.productReponsitory.findAndCount({
        where: { ...searchQuery },
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        relations: ['category', 'price', 'price.unit', 'file'],
        order: {
          createdAt: 'DESC',
        },
        select: SELECT_PAGING_PRODUCT_CONSTANT,
      });
      return {
        data: data,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
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
      const data = await this.productReponsitory.find({ where: searchQuery });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id: number) {

  }

  async getBySlug(slug: string) {

  }

  async create(data: CreateProductDTO) {

  }

  async update(id: number, data: UpdateProductDTO) {

  }

  async getByCategorySlug({
    slug,
    pageSize,
    pageIndex,
  }: {
    slug: string[];
    pageSize: number;
    pageIndex: number;
  }) {
    try {
      const category = await this.cateService.getCategoryByArraySlug(slug);
      const result = await this.productReponsitory.find({
        where: { category: { id: In(category.map((cate) => cate.id)) } },
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        order: { createdAt: 'DESC' },
      });
      const count = await this.productReponsitory.count({
        where: { category: { id: In(category.map((cate) => cate.id)) } },
      });

      return {
        products: result || [],
        totalPages: Math.ceil(count / pageSize),
        totalDocs: count,
      };
    } catch (error) {
      throw error;
    }
  }

  //gRPC
  async getProductByIds(ids: number[]) {
    try {
      if (ids?.length === 0) {
        return { success: false, code: -1, message: 'Không đủ dữ liệu!' };
      }
      const productList = await this.productReponsitory.find({
        where: { id: In(ids) },
        relations: [
          'category',
          'price',
          'price.unit',
          'quantity',
          'quantity.unit',
          'quantity.warehouse',
          'file',
          'detail',
        ],
      });
      return {
        success: true,
        message: 'Thành công',
        code: 0,
        products: productList,
      };
    } catch (error) {
      console.log(error);
      return { success: false, code: -1, message: error.message };
      throw error;
    }
  }

  async checkStock({ productId, quantityId, quantity }: IPlaceOrderInterface) {
    try {
      if (!productId || !quantity) {
        return { success: false, code: -1, message: 'Thiếu dữ liệu!' };
      }

      const product = await this.productReponsitory.findOne({
        where: { id: productId },
        relations: [
          'price',
          'price.unit',
          'quantity',
          'quantity.unit',
          'quantity.warehouse',
        ],
      });

      return { success: true, code: 0, message: 'Ready to cook', product };
    } catch (error) {
      console.log(error);
      return { success: false, code: -1, message: error.message };
    }
  }

  async placeOrder(data: IPlaceOrderInterface[]) {

  }

  async getPagingProductByCateId(cateId, pageSize = 5, pageIndex = 1) {
    try {
      const data = await Promise.all(
        cateId?.map(async (itemCate) => {
          const productList = await this.productReponsitory.find({
            where: { category: { id: itemCate } },
            skip: pageSize * pageIndex - pageSize,
            take: pageSize,
            order: { createdAt: 'DESC' },
          });
          return { cateId: itemCate, productList: productList };
        }),
      );
      return data;
    } catch (error) {
      return [];
    }
  }
}
