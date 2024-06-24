import { BaseEntity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Partner } from "./partner.entity";
import { Unit } from "./unit.entity";

@Entity()
export class ProfilePartner extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    image: string;

    @Column()
    open: string;

    @Column()
    close: string;

    @Column()
    idCard: string;

    @Column()
    isActive: boolean;

    @Column()
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column()
    unitId: number;

    @Column()
    partnerId: number;

    @OneToOne(() => Partner)
    @JoinColumn()
    partner: Partner;

    @ManyToOne(() => Unit, unit => unit.profilePartners)
    @JoinColumn()
    unit: Unit;
}


