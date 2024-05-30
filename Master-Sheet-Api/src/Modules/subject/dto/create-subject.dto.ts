import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name_english: string;

  @IsNotEmpty()
  @IsString()
  name_arabic: string;

  @IsNotEmpty()
  @IsInt()
  college_id: number;
}
