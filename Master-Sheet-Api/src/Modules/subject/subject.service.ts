import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { eq } from 'drizzle-orm';

@Injectable()
export class SubjectService {
  constructor(@Inject(DrizzleAsyncProvider) private db:NodePgDatabase<typeof schema>){}


  async create(createSubjectDto: CreateSubjectDto[]) {
    if(Array.isArray(createSubjectDto) )
    for (const subject of createSubjectDto) {
      const existingSubject = await this.findOne(subject.code);

      if (existingSubject.length) {
        throw new BadRequestException(`هذا ${subject.code} الرمز مستخدم`);
      }
    }
    else{
      const { code } = createSubjectDto;
      const existingSubject = await this.findOne(code);

      if (existingSubject.length) {
        throw new BadRequestException(`هذا ${code} الرمز مستخدم`);
      }
    }
    return await this.db.insert(schema.subject).values(createSubjectDto).returning();
  }

   

  async findAll() {
    return await this.db.query.subject.findMany();
  }

  async findOne(code: string) {
    return await this.db.select().from(schema.subject).where(eq(schema.subject.code, code));
  }

  async update(code: string, updateSubjectDto: UpdateSubjectDto) {
    return await this.db.update(schema.subject) .set(updateSubjectDto).where(eq(schema.subject.code, code)).returning();
  }

  async remove(code: string) {
    return await this.db.delete(schema.subject) .where(eq(schema.subject.code, code)).returning();
  }
}
