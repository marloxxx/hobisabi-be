import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Partner } from "./partner.entity";

@Entity()
export class Advertisement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Partner)
    @JoinColumn()
    partnerId: number;

    @Column()
    duration: number;

    @Column()
    suggestion: string;

    @Column()
    keyword: string;

    @Column()
    popular: string;

    @Column()
    banner: string;

    @Column()
    popup: string;

    @Column()
    adToken: string;

    @Column({ default: false })
    suggestionActive: boolean;

    @Column({ default: false })
    searchActive: boolean;

    @Column({ default: false })
    popularActive: boolean;

    @Column({ default: false })
    bannerActive: boolean;

    @Column({ default: false })
    popupActive: boolean;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Partner, partner => partner.advertisement)
    partner: Partner;
}