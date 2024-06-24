import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { IsBoolean } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {
    @ApiPropertyOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsBoolean()
    isDelete: boolean;
}
