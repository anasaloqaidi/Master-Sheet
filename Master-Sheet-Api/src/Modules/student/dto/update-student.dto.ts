import { PartialType } from '@nestjs/mapped-types';
import {  Student } from './create-student.dto';

export class UpdateStudentDto extends PartialType(Student) {}
