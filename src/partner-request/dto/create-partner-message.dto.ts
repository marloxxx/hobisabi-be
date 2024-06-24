import { PartnerRequest } from "src/database/entities/partner-request.entity";

export class CreatePartnerMessageDto {

    title: string;
    image: string;
    is_admin: boolean;
    partnerRequestId: number;
}