import { IsBoolean, IsDateString, IsString } from "class-validator";

export class CreateBookDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    publicationYear: string;

    @IsBoolean()
    isAvailable: boolean;

}
