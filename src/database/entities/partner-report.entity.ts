import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Partner } from "./partner.entity";
import { User } from "./user.entity";

@Entity()
export class PartnerReport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partnerId: number;

    @Column()
    userId: number;

    @Column()
    description: string;

    @Column()
    proof: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Partner, partner => partner.partnerReports)
    @JoinColumn({ name: 'partnerId' })
    partner: Partner;

    @ManyToOne(() => User, user => user.partnerReports)
    @JoinColumn({ name: 'userId' })
    user: User;
}