import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../RoleModule/role.entity';

export type actionType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'MANAGE';

export enum actionEnum {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: String })
  subject: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: actionEnum,
  })
  action: actionEnum;

  @ManyToMany(() => Role, (role) => role.permission)
  role: Role[];
}
