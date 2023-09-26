import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../RoleModule/role.entity';

export enum Status {
  ACTIVE = 1,
  INACTIVE = 0,
  BLOCK = -1,
}
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: String })
  fullname: string;

  @Column({
    type: String,
    default:
      'https://i.pinimg.com/originals/4c/3a/d0/4c3ad0c8189b2e864672531b58225932.jpg',
  })
  avatar: string;

  @Column({ type: String, nullable: true, unique: true })
  email: string;

  @Column({ type: String, nullable: false, unique: true })
  phoneNumber: string;

  @Column({ type: String, nullable: true })
  address: string;

  @Column({ type: String, nullable: false, select: false })
  password: string;

  @Column({ type: Number, enum: Status, default: Status.INACTIVE })
  status: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role' })
  role: Role;
}
