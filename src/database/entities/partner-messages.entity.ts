import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PartnerRequest } from "./partner-request.entity";

@Entity()
export class PartnerMessage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    image: string;

    @Column({ default: false })
    is_admin: boolean;

    @Column()
    partnerRequestId: number;

    @OneToOne(() => PartnerRequest)
    @JoinColumn({ name: "partnerRequestId" })
    partnerRequest: PartnerRequest;
}