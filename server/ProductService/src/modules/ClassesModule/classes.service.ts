import { Injectable } from "@nestjs/common";
import { BaseService } from "../BaseModule/base.service";
import { ClassesEntity } from "./classes.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SELECT_PAGING_CLASS_CONSTANT } from "src/constant/global.constant";
import { CreateClassesDTO, UpdateClassesDTO } from "./dto/classes.dto";
import { CategoryService } from "../CategoryModule/categories.service";


@Injectable()
export class ClassesService extends BaseService<ClassesEntity>{
    constructor(@InjectRepository(ClassesEntity)private readonly classesEntity: Repository<ClassesEntity>, private readonly categoryService: CategoryService){
        super(classesEntity)
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
          const [data, totalDocs] = await this.classesEntity.findAndCount({
            where: { ...searchQuery },
            skip: pageSize * pageIndex - pageSize,
            take: pageSize,
            relations: ['category'],
            order: {
              createdAt: 'DESC',
            },
            select: SELECT_PAGING_CLASS_CONSTANT,
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

      async getById(id: number) {
        try {
          const result = await this.classesEntity.findOne({ where: { id }, relations: ['category'] })
    
          return result
        } catch (error) {
          throw error
        }
      }
      async create(data: CreateClassesDTO) {

        const newProduct = this.classesEntity.create({
          ...data, category: [{ id: data.category }]
        })
        try {
          await newProduct.save()
          return newProduct
        } catch (error) {
          throw error
        }
      }
      async update(id: number, data: UpdateClassesDTO) {
        try {
          const result = await this.classesEntity.save({ ...data, category: [{ id: data.category }], id })
          return result
        } catch (error) {
          throw error
        }
      }
      async getBySlug(slug: string) {
        try {
          const result = await this.classesEntity.findOne({ where: { slug }, relations: ['category'] })
          return { ...result  }
        } catch (error) {
          throw error
        }
      }
      async deleteProduct(id: number) {
        try {
          const result = await this.classesEntity.delete({ id })
    
          return result.affected > 0 ? true : false
        } catch (error) {
          throw error
        }
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
          const category = await this.categoryService.getCategoryByArraySlug(slug);
          const result = await this.classesEntity.find({
            where: { category: { id: In(category.map((cate) => cate.id)) } },
            skip: pageSize * pageIndex - pageSize,
            take: pageSize,
            order: { createdAt: 'DESC' },
          });
          const count = await this.classesEntity.count({
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
}