import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePreparingSubjectDto } from './dto/create-preparing-subject.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { and, eq } from 'drizzle-orm';

@Injectable()
export class PreparingSubjectService {
  constructor(@Inject(DrizzleAsyncProvider) private db:NodePgDatabase<typeof schema>){}

  async create(createPreparingSubjectDto: CreatePreparingSubjectDto) {
    
    const { subject_code , stage_id , academic_year_id, department_id  } = createPreparingSubjectDto;
  
    const existingPreparingSubject = await this.findOne(subject_code, stage_id,academic_year_id,department_id);
  
    if (!existingPreparingSubject) {
      throw new BadRequestException('الترتيب مستخدم');
    }
    return await this.db.insert(schema.preparingSubject).values(createPreparingSubjectDto).returning();
  }

  async findAll(department_id:number) {
    const currentAcademicYear = await this.db.select().from(schema.academicYear).where(eq(schema.academicYear.is_current,true));
    return await this.db
    .select()
    .from(schema.preparingSubject)
    .where(
      and(
        eq(schema.preparingSubject.department_id, department_id),
        eq(schema.preparingSubject.academic_year_id,currentAcademicYear[0].id),

      )
    );
  }

  async findOne(subject_code: string , stage_id: number , academic_year_id:number , department_id:number) {
    return await this.db.select().from(schema.preparingSubject).where(and(eq(schema.preparingSubject.subject_code, subject_code),eq(schema.preparingSubject.stage_id, stage_id),eq(schema.preparingSubject.academic_year_id, academic_year_id),eq(schema.preparingSubject.department_id, department_id)) );
  }


  async remove(subject_code: string , stage_id: number , academic_year_id:number , department_id:number) {
    return await this.db.delete(schema.preparingSubject) .where(and(eq(schema.preparingSubject.subject_code, subject_code),eq(schema.preparingSubject.stage_id, stage_id),eq(schema.preparingSubject.academic_year_id, academic_year_id),eq(schema.preparingSubject.department_id, department_id))).returning();
  }
}
