import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsDateString, IsInt, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { GenderType, Status, StudyType } from 'src/Modules/drizzle/enums';




export class CreateStudentDto {

    @IsInt()
    @IsNotEmpty()
    academic_year_id: number;

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @IsInt()
    @IsNotEmpty()
    stage_id: number;

    @ValidateNested({ each: true })
    @Type(() => Student)
    students: Student[];
  

}


export class Student{

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    middle_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    photo: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsDateString()
    birthday: string;

    @IsNotEmpty()
    @IsEnum(StudyType, { message: 'OTP Type must be one of these values:' + Object.values(StudyType).join(', '), })
    study_type: StudyType;

    @IsNotEmpty()
    @IsEnum(GenderType, { message: 'OTP Type must be one of these values:' + Object.values(GenderType).join(', '), })
    gender: GenderType;
  

    @IsNotEmpty()
    @IsInt()
    enrollment_year_id: number;

    @IsNotEmpty()
    @IsInt()
    department_id: number;
}
