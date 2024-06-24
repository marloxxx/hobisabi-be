import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class MaintenanceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    platform_cost: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    topup_cost: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}