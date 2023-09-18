import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  Long,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../ProductModule/product.entity';
import { Unit } from '../Unit/unit.entity';

@Entity({ name: 'productPrices' })
@Unique('product_price', ['productId', 'unitId'])
export class ProductPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number })
  price: number;

  @Column({ type: Number, nullable: true })
  fakePrice: number;

  @Column({ type: Number, nullable: true })
  basePrice: number;

  @ManyToOne((type) => Product, (product) => product.price, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne((type) => Unit)
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @Column({ type: 'int' })
  unitId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
