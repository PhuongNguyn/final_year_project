import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  Long,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../CategoryModule/categories.entity';
import { ProductDetail } from '../ProductDetail/productDetail.entity';
import * as moment from 'moment';

export type productStatusType = 0 | 1 | -1;
// '-1': 'Không hiển thị!',
// 0: 'Hết hàng!',
// 1: 'Còn hàng!',

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String, unique: true })
  slug: string;

  @Column({ type: String })
  description: string;

  @Column({ type: String })
  content: string;

  @Column({ type: Number })
  price: number;

  @Column({ type: String })
  thumbnail: string;

  @ManyToMany(() => Category, (cate) => cate.products)
  @JoinTable({ name: 'product_category' })
  category: Category[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
 
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
