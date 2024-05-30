import { IsDateString, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateAcademicYearDto {
    
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @IsNotEmpty()
  @IsInt()
  college_id: number;

  @IsNotEmpty()
  @IsBoolean()
  is_current: boolean=false;
}
