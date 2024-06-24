import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePartnerDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name should not be empty' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Fullname should not be empty' })
    fullname: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Image should not be empty' })
    image: any;

    @ApiProperty()
    @IsNotEmpty({ message: 'Description should not be empty' })
    description: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'OpenCloseTime should not be empty' })
    openCloseTime: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Address should not be empty' })
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'City should not be empty' })
    city: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'District should not be empty' })
    district: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'LatLong should not be empty' })
    latLong: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Maps should not be empty' })
    maps: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Duration should not be empty' })
    duration: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Keyword should not be empty' })
    keyword: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'PopularActive should not be empty' })
    popularActive: boolean;

    @ApiProperty()
    @IsNotEmpty({ message: 'Popular should not be empty' })
    popular: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'SuggestionActive should not be empty' })
    suggestionActive: boolean;

    @ApiProperty()
    @IsNotEmpty({ message: 'Suggestion should not be empty' })
    suggestion: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'AdToken should not be empty' })
    adToken: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Banner should not be empty' })
    banner: any;

    @ApiProperty()
    @IsNotEmpty({ message: 'Popup should not be empty' })
    popup: any;

    @ApiProperty()
    @IsNotEmpty({ message: 'Files should not be empty' })
    files: any;

    @ApiProperty()
    @IsNotEmpty({ message: 'IdCard should not be empty' })
    idCard: any;
}
