import { PartialType } from '@nestjs/mapped-types';
import { CreateMidGradeDto } from './create-mid-grade.dto';

export class UpdateMidGradeDto extends PartialType(CreateMidGradeDto) {}
