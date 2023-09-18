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

  @Column({ type: Number, default: 0 })
  liked: number;

  @Column({ type: Number, default: 0 })
  view: number;

  @Column({ type: Number, default: 0 })
  rated: number;

  @Column({ type: Number, default: 0 })
  ordered: number;

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      to(value: dataType[]): string {
        return JSON.stringify(value);
      },
      from(value: string): dataType[] {
        return JSON.parse(value);
      },
    },
  })
  parameter?: { key: string; value: string }[];

  @OneToOne((type) => Product, (product) => product.detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: Number })
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
