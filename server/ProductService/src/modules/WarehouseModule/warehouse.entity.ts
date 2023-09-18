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
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../ProductModule/product.entity';
import { Unit } from '../Unit/unit.entity';

@Entity({ name: 'warehouses' })
export class Warehouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  name: string;

  @Column({ type: String, unique: true })
  address: string;

  // @Column({ type: 'decimal' })
  // iat: number;

  // @Column({ type: 'decimal' })
  // long: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
