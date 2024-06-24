import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreatePaymentMethodDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name should be a string' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Number should not be empty' })
    @IsString({ message: 'Number should be a string' })
    number: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Bank should not be empty' })
    @IsString({ message: 'Bank should be a string' })
    bank: string;
}
