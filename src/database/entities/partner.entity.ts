import { BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, Entity, OneToOne, JoinColumn } from "typeorm";
import { PartnerWithdraw } from "./partner-withdraw.entity";
import { Room } from "./room.entity";
import { PartnerRequest } from "./partner-request.entity";
import { ProfilePartner } from "./profile-partner.entity";
import { Advertisement } from "./advertisement.entity";
import { Image } from "./image.entity";
import { Location } from "./location.entity";
import { PartnerReport } from "./partner-report.entity";

@Entity()
export class Partner extends BaseEntity {
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

    @OneToMany(() => PartnerWithdraw, partnerWithdraw => partnerWithdraw.partner)
    @JoinColumn()
    withdraws: PartnerWithdraw[];

    @OneToMany(() => Room, room => room.partner)
    rooms: Room[];

    @OneToMany(() => PartnerRequest, partnerRequest => partnerRequest.partner)
    partnerRequests: PartnerRequest[];

    @OneToOne(() => Location)
    location: Location;

    @OneToOne(() => ProfilePartner)
    profilePartner: ProfilePartner;

    @OneToOne(() => Advertisement, advertisement => advertisement.partner)
    advertisement: Advertisement;

    @OneToMany(() => Image, image => image.partner)
    @JoinColumn()
    images: Image[];

    @OneToMany(() => PartnerReport, partnerReport => partnerReport.partner)
    partnerReports: PartnerReport[];
}
