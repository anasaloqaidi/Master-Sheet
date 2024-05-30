import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body(ValidationPipe) createDepartmentDto: CreateDepartmentDto[]) {
    return this.departmentService.create(createDepartmentDto);
  }


  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.departmentService.remove(id);
  }
}
