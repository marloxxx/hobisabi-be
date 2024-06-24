import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWithdrawDto {
    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    partnerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bank: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}
