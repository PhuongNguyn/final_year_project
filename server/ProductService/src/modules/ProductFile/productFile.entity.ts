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
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../ProductModule/product.entity';

export type fileRole =
  | 'thumbnail'
  | 'main_image'
  | 'product_image'
  | 'introduce_video';

@Entity({ name: 'productFile' })
@Unique('product_file', ['link'])
export class ProductFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  link: string;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String })
  role: fileRole;

  @ManyToOne((type) => Product, (product) => product.file, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
