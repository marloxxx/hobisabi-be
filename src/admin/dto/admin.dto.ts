import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    password?: string
}