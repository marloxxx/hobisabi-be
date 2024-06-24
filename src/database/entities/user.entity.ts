import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTransaction } from "./user-transaction.entity";
import { Booking } from "./booking.entity";
import { PartnerReport } from "./partner-report.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column()
    refreshToken: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDelete: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => UserTransaction, userTransaction => userTransaction.user)
    transactions: UserTransaction[];

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => PartnerReport, partnerReport => partnerReport.user)
    partnerReports: PartnerReport[];
}
