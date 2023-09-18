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
import { Warehouse } from '../WarehouseModule/warehouse.entity';
import { Min } from 'class-validator';

@Entity({ name: 'productQuantity' })
@Unique('product_quantity', ['product', 'unit', 'warehouse'])
export class ProductQuantity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number })
  @Min(0)
  quantity: number;

  @ManyToOne((type) => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne((type) => Unit)
  @JoinColumn({ name: 'unit' })
  unit: Unit;

  @ManyToOne((type) => Warehouse)
  @JoinColumn({ name: 'warehouse' })
  warehouse: Unit;

  @Column({ type: Number })
  warehouseId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
