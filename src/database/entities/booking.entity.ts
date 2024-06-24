import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    partnerId: number;

    @Column()
    qrCode: string;

    @Column()
    code: string;

    @Column()
    status: string;

    @Column()
    total: number;

    @Column()
    amount: number;

    @Column()
    isActive: boolean;

    @Column()
    isDelete: boolean;

    @Column()
    userId: number;

    @Column()
    roomId: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.bookings)
    user: User;
}
