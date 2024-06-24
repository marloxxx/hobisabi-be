import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto';
import { IsBoolean } from 'class-validator';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
    @ApiPropertyOptional()
    @IsBoolean({ message: 'isActive should be a boolean' })
    isActive: boolean;

    @ApiPropertyOptional()
    @IsBoolean({ message: 'isDelete should be a boolean' })
    isDelete: boolean;
}
