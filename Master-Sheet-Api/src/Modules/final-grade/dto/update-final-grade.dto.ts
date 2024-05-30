import { PartialType } from '@nestjs/mapped-types';
import { CreateFinalGradeDto } from './create-final-grade.dto';


export class UpdateFinalGradeDto extends PartialType(CreateFinalGradeDto) {}
