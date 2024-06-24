import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Partner } from "./partner.entity";

@Entity()
export class PartnerBalance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Partner)
    @JoinColumn()
    partnerId: number;

    @Column()
    balance: number;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}