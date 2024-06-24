import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Partner } from "./partner.entity";

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    maps: string;

    @Column()
    longitude: string;

    @Column()
    latitude: string;

    @Column()
    address: string;

    @Column()
    district: string;

    @Column()
    city: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column()
    partnerId: number;

    @OneToOne(() => Partner)
    @JoinColumn()
    partner: Partner;
}