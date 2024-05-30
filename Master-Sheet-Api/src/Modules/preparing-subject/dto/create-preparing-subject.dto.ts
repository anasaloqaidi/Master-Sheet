import { IsNotEmpty, IsInt, IsString, Min, Max, IsEnum } from 'class-validator';
import { SemesterType } from 'src/Modules/drizzle/enums';

export class CreatePreparingSubjectDto {
  @IsNotEmpty()
  @IsString()
  subject_code: string;

  @IsNotEmpty()
  @IsInt()
  academic_year_id: number;

  @IsNotEmpty()
  @IsInt()
  stage_id: number;


  @IsNotEmpty()
  @IsEnum(SemesterType, { message: 'OTP Type must be one of these values:' + Object.values(SemesterType).join(', '), })
  semester: SemesterType;

  @IsNotEmpty()
  @IsInt()
  department_id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100) // Assuming this is the maximum value for smallint
  subject_weight: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(60) // Assuming this is the maximum value for smallint
  limit_of_mid: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(60) // Assuming this is the maximum value for smallint
  limit_of_final: number;
}
