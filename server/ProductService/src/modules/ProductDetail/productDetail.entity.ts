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
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../ProductModule/product.entity';

interface dataType {
  key: number;
  value: string;
}

@Entity({ name: 'productDetails' })
@Unique('product_detail', ['id'])
export class ProductDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  videoUrl: string

  @Column({ type: Number, default: 0 })
  liked: number;

  @Column({ type: Number, default: 0 })
  view: number;

  @Column({ type: Number, default: 0 })
  rated: number;

  @Column({ type: Number, default: 0 })
  ordered: number;

  @ManyToOne((type) => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
