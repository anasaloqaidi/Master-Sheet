import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body(ValidationPipe) createSubjectDto: CreateSubjectDto[]) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.subjectService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body(ValidationPipe) updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(code, updateSubjectDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.subjectService.remove(code);
  }
}
