import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../ProductModule/product.entity';
import { ClassesEntity } from '../ClassesModule/classes.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: String })
  name: string;

  @Index({ unique: true })
  @Column({ type: String })
  slug: string;

  @Column({ type: String, nullable: true })
  content: string;

  @Column({ type: Boolean, default: true })
  isShow: boolean;

  @Column({ type: Number, nullable: true })
  priority: number;

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[];

  @ManyToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToMany(() => ClassesEntity, (product) => product.category)
  classes: ClassesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
