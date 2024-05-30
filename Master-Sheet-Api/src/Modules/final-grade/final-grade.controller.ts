import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FinalGradeService } from './final-grade.service';
import { CreateFinalGradeDto } from './dto/create-final-grade.dto';

@Controller('final-grade')
export class FinalGradeController {
  constructor(private readonly FinalGradeService: FinalGradeService) {}

  @Post()
  create(@Body(ValidationPipe) createFinalGradeDto: CreateFinalGradeDto[]) {
    return this.FinalGradeService.create(createFinalGradeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return await this.FinalGradeService.findAll(req.user.department);
  }


}
