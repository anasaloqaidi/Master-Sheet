import { PartialType } from '@nestjs/mapped-types';
import { CreatePreparingSubjectDto } from './create-preparing-subject.dto';

export class UpdatePreparingSubjectDto extends PartialType(CreatePreparingSubjectDto) {}
