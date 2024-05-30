import { IsNotEmpty, IsInt, IsString, MinLength, MaxLength, IsPositive } from 'class-validator';

export class CreateStageDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    order: number;

    @IsNotEmpty()
    @IsInt()
    college_id: number;
}

