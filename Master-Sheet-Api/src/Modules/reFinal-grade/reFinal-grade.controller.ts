import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReFinalGradeService } from './reFinal-grade.service';
import { CreateReFinalGradeDto } from './dto/create-ReFinal-grade.dto';

@Controller('refinal-grade')
export class ReFinalGradeController {
  constructor(private readonly ReFinalGradeService: ReFinalGradeService) {}

  @Post()
  create(@Body(ValidationPipe) createReFinalGradeDto: CreateReFinalGradeDto[]) {
    return this.ReFinalGradeService.create(createReFinalGradeDto);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return await this.ReFinalGradeService.findAll(req.user.department);
  }


}
