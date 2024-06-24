import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Partner } from "./partner.entity";

@Entity()
export class PartnerWithdraw extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partnerId: number;

    @Column()
    amount: number;

    @Column()
    bank: string;

    @Column()
    number: string;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    proof: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Partner, partner => partner.withdraws)
    partner: Partner;
}
