import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post()
  create(@Body(ValidationPipe) createCollegeDto: CreateCollegeDto) {
    return this.collegeService.create(createCollegeDto);
  }

  @Get()
  findAll() {
    return this.collegeService.findAll();
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateCollegeDto: UpdateCollegeDto) {
    console.log(id)
    return this.collegeService.update(id, updateCollegeDto);
  }
}
