import { IsNotEmpty, IsInt, IsString, IsEnum } from 'class-validator';
import { SemesterType } from 'src/Modules/drizzle/enums';


export class CreateMidGradeDto {
  @IsNotEmpty()
  @IsString()
  subject_code: string;

  @IsNotEmpty()
  @IsInt()
  academic_year_id: number;

  @IsNotEmpty()
  @IsInt()
  student_id: number;

  @IsNotEmpty()
  @IsInt()
  stage_id: number;

  @IsNotEmpty()
  @IsEnum(SemesterType)
  semester: SemesterType;

  @IsNotEmpty()
  @IsInt()
  grade: number;
}
