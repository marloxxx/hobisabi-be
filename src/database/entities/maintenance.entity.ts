import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Maintenance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    platform_cost: number;

    @Column()
    topup_cost: number;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
