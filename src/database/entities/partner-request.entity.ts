import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Partner } from "./partner.entity";
import { PartnerMessage } from "./partner-messages.entity";

@Entity()
export class PartnerRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    partnerId: number;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Partner, partner => partner.partnerRequests)
    @JoinColumn({ name: 'partnerId' })
    partner: Partner;

    @OneToMany(type => PartnerMessage, partnerMessage => partnerMessage.partnerRequest)
    partnerMessages: PartnerMessage[];
}