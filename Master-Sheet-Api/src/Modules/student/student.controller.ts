import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body(ValidationPipe) createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
 async findAll(@Request() req) {
   const result = await this.studentService.findAll( req.user.department);
   if (!result) {
     throw new BadRequestException("student not found");
   }
   return result;
 }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }
}
