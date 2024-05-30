import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import {GenderType , UserRole} from "../../drizzle/enums";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    first_name: string;
  
    @IsNotEmpty()
    @IsString()
    middle_name: string;
  
    @IsNotEmpty()
    @IsString()
    last_name: string;
  
    @IsNotEmpty()
    @IsString()
    birthday: string; // Assuming date is stored as string
  
    @IsString()
    photo: string = '';
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @IsEnum(GenderType, { message: 'OTP Type must be one of these values:' + Object.values(GenderType).join(', '), })
    gender: GenderType; 
  
    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;
  
    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'OTP Type must be one of these values:' + Object.values(UserRole).join(', '), })
    role: UserRole; 
  
    department_id: number;
}
