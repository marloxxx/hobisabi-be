import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePartnerRequestDto } from './create-partner-request.dto';
import { IsBoolean } from 'class-validator';

export class UpdatePartnerRequestDto extends PartialType(CreatePartnerRequestDto) {
    @ApiPropertyOptional()
    @IsBoolean()
    status: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    isDelete: boolean;
}
