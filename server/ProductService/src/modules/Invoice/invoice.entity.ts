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
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Product } from '../ProductModule/product.entity';

interface dataType {
    key: number;
    value: string;
}

@Entity({ name: 'invoices' })
@Unique('invoices', ['id'])
export class Invoices extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany((type) => Product, (product)=>product.id)
    @JoinTable({ name: 'products_invoice' })
    products: Product[];

    @Column({type: Number})
    user: number

    @Column({type: Number})
    total: number

    @Column({type: String, enum: ["paid", "unpaid", "error"], default: "unpaid"})
    status: "paid" | "unpaid" | "error"

    @CreateDateColumn({
        type: "timestamptz"
    })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'timestamptz',
    })
    updatedAt: Date;
}
