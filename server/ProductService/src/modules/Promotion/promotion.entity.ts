import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type promotionType = 'percentage' | 'cash';

@Entity()
export class Promotion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: Number })
  amount: number;

  @Column({ type: String })
  type: promotionType;
}
