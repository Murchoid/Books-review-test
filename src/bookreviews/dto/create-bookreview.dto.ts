import { IsDate, IsString, IsInt, min, max, Min, Max } from "class-validator";

export class CreateBookreviewDto {

    @IsString()
    content: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsDate()
    createdAt:Date;

}
