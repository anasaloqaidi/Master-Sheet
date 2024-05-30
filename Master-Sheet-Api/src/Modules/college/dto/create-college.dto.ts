import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCollegeDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    success_grade: number = 50;

    @IsBoolean()
    is_configure: boolean = true;
}
