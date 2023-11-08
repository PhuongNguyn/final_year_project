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
  slug: string;

  @Column({ type: String })
  description: string

  @Column({ type: String })
  videoUrl: string

  @Column({ type: Number, default: 0 })
  ordered: number;

  @Column({ type: Boolean, default: false })
  isFree: boolean

  @ManyToOne((type) => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product' })
  product: Product;
  @UpdateDateColumn({
  type: 'timestamptz',
})
createdAt: Date;

@UpdateDateColumn({
  type: 'timestamptz',
})
updatedAt: Date;
}
