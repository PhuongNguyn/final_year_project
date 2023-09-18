import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { BaseService } from '../BaseModule/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateDTO } from './dto/updateCategory.dto';
import { ProductService } from '../ProductModule/product.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryReponsitory: Repository<Category>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {
    super(categoryReponsitory);
  }

  async getPagingCategory({
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
      const [categories, totalDocs] =
        await this.categoryReponsitory.findAndCount({
          where: searchQuery,
          skip: pageSize * pageIndex - pageSize,
          take: pageSize,
          relations: { parent: true, children: true, products: true },
          order: {
            createdAt: 'DESC',
          },
        });

      return {
        data: categories,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }
  async getCategoryById(id: number) {
    try {
      const categories = await this.categoryReponsitory.findOne({
        where: { id: id },
        relations: { parent: true },
      });

      if (categories) {
        return categories;
      }
      throw new NotFoundException('Category not found!');
    } catch (error) {
      throw error;
    }
  }
  async getCategoryBySlug(slug: string) {
    try {
      const categories = await this.categoryReponsitory.findOne({
        where: { slug: slug },
      });

      if (categories) {
        return { success: true, data: categories };
      } else {
        return { success: false, message: 'Not found!' };
      }
      throw new NotFoundException('Category not found!');
    } catch (error) {
      throw error;
    }
  }
  async createCategory(data: CreateCategoryDTO) {
    try {
      const checkExists = await this.categoryReponsitory.findOne({
        where: [{ name: data.name }, { slug: data.slug }],
      });

      if (checkExists) {
        return { success: false, message: 'Chuyên mục đã tồn tại!' };
      }

      const result = this.categoryReponsitory.create(data);
      await this.categoryReponsitory.save(result);
      return { success: true, result, message: 'Tạo chuyên mục thành công!' };
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(id: number, updateData: UpdateDTO) {
    try {
      const result = await this.categoryReponsitory.update(id, updateData);

      if (result.affected !== 0) {
        return {
          sucess: true,
          result: this.categoryReponsitory.find({ where: { id: id } }),
          message: 'Cập nhật thành công',
        };
      } else {
        return {
          success: false,
          message: 'Chuyên mục không tồn tại!',
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteCategory(id: number) {
    //cần check khi xóa chuyên mục thì còn sản phẩm trong đó không!
    return this.categoryReponsitory.delete(id);
  }

  async getCategoryByArraySlug(slug: string[]) {
    try {
      const result = await Promise.all(
        slug.map(async (item) => {
          return this.categoryReponsitory.findOneBy({ slug: item });
        }),
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getHomeCateAndProduct() {
    try {
      const listCateHome = await this.categoryReponsitory.find({
        where: {
          isShow: true,
        },
      });
      const listCateProduct =
        await this.productService.getPagingProductByCateId(
          listCateHome?.map((item) => item.id),
          5,
          1,
        );
      const finalResult = listCateHome.map((item) => {
        return {
          ...item,
          product: listCateProduct.find(
            (itemProduct) => itemProduct.cateId === item.id,
          )?.productList,
        };
      });
      return finalResult;
    } catch (error) {
      throw error.message;
    }
  }
}
