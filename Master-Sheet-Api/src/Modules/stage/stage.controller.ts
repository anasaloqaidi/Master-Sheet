import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { StageService } from './stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  create(@Body(ValidationPipe) createStageDto: CreateStageDto[]) {
    return this.stageService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.stageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateStageDto: UpdateStageDto) {
    return this.stageService.update(id, updateStageDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.stageService.remove(id);
  }
}
