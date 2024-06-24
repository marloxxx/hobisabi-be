import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfilePartner } from "./profile-partner.entity";

@Entity()
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    unit: string;

    @Column()
    isActive: boolean;

    @Column()
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => ProfilePartner, profilePartner => profilePartner.unit)
    @JoinColumn()
    profilePartners: ProfilePartner[];
}