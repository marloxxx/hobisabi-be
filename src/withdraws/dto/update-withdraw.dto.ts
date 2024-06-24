import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateWithdrawDto } from './create-withdraw.dto';

export class UpdateWithdrawDto extends PartialType(CreateWithdrawDto) {
    @ApiPropertyOptional()
    status: string;
}
