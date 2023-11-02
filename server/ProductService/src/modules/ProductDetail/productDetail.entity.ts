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
import { User } from '../UserModule/user.entity';


interface dataType {
  key: number;
  value: string;
}

@Entity({ name: 'productDetails' })
@Unique('product_detail', ['id'])
export class ProductDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({Number})
  order: number;
  @Column({Boolean})
  isFree: boolean;
  @Column({String})
  description: string;
  @Column({String})
  content: string;
  @Column({String})
  videoUrl: string;
 // Product
  @ManyToOne(() => Product, (product) => product.productDetails)
  @JoinColumn({ name: 'productId' })
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
