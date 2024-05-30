import { IsNotEmpty, IsInt } from 'class-validator';


export class CreateDepartmentDto {
  @IsInt()
  college_id: number;
  
  @IsNotEmpty()
  name: string;
}