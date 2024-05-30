import { PartialType } from '@nestjs/mapped-types';
import { CreateReFinalGradeDto } from './create-reFinal-grade.dto';


export class UpdateReFinalGradeDto extends PartialType(CreateReFinalGradeDto) {}
