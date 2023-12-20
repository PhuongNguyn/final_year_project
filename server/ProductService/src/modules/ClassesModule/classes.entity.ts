import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Category } from '../CategoryModule/categories.entity';
  
  export type productStatusType = 0 | 1 | -1;
  // '-1': 'Không hiển thị!',
  // 0: 'Hết hàng!',
  // 1: 'Còn hàng!',
  
  @Entity({ name: 'classes' })
  export class ClassesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: String })
    title: string;
  
    @Column({ type: String, unique: true })
    slug: string;
  
    @Column({ type: String })
    description: string;
  
    @Column({ type: Number })
    price: number;
  
    @Column({ type: String })
    thumbnail: string;
  
    @ManyToMany(() => Category, (cate) => cate.classes)
    @JoinTable({ name: 'class_category' })
    category: Category[];
  
    @Column({ type: Number })
    fakePrice: number;
  
    @CreateDateColumn({
      type: 'timestamptz',
    })
    createdAt: Date;

    @Column({type: Date})
    startAt: Date;

    @Column({type: Date})
    endAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamptz',
    })
    updatedAt: Date;
  }
  