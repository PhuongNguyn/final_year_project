import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Long,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'units' })
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
