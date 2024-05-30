import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { MidGradeService } from './mid-grade.service';
import { CreateMidGradeDto } from './dto/create-mid-grade.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('mid-grade')
export class MidGradeController {
  constructor(private readonly midGradeService: MidGradeService) {}

  @Post()
  create(@Body(ValidationPipe) createMidGradeDto: CreateMidGradeDto[]) {
    return this.midGradeService.create(createMidGradeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return await this.midGradeService.findAll(req.user.department);
  }


}
