import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  BadRequestException,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { CreatePreparingSubjectDto } from "./dto/create-preparing-subject.dto";
import { PreparingSubjectService } from "./preparing-subject.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("preparing-subject")
export class PreparingSubjectController {
  constructor(
    private readonly preparingSubjectService: PreparingSubjectService
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) createPreparingSubjectDto: CreatePreparingSubjectDto
  ) {
    try {
      const result = await this.preparingSubjectService.create(
        createPreparingSubjectDto
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

 
  @Get()
   @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const result = await this.preparingSubjectService.findAll( req.user.department);
    if (!result) {
      throw new BadRequestException("Preparing subject not found");
    }
    return result;
  }

  @Delete()
  async remove(
    @Query("subject_code") subjectCode: string,
    @Query("stage_id") stageId: string,
    @Query("academic_year_id") academicYearId: string,
    @Query("department_id") departmentId: string
  ) {
    const result = await this.preparingSubjectService.remove(
      subjectCode,
      +stageId,
      +academicYearId,
      +departmentId
    );
    if (!result) {
      throw new BadRequestException("Preparing subject not found");
    }
    return result;
  }
}
