import { Inject, Injectable } from '@nestjs/common';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { and, eq, not } from 'drizzle-orm';

@Injectable()
export class AcademicYearService {
  constructor(@Inject(DrizzleAsyncProvider) private db:NodePgDatabase<typeof schema>){}


  async create(createAcademicYearDto: CreateAcademicYearDto) {
    return await this.db.insert(schema.academicYear).values({...createAcademicYearDto,is_current:false}).returning();
  }

  async findAll() {
    return await this.db.query.academicYear.findMany();
  }
  
  async findOne(id: number) {
    return await this.db.select().from(schema.academicYear).where(eq(schema.academicYear.id, id));
  }

  async findCurrent() {
    return await this.db.select().from(schema.academicYear).where(eq(schema.academicYear.is_current, true));
  }

 async update(id: number, updateAcademicYearDto: UpdateAcademicYearDto) {
  try {
   return await this.db.transaction(async (tx) => {
      const updatedAcademicYear = await tx.update(schema.academicYear)
        .set(updateAcademicYearDto)
        .where(eq(schema.academicYear.id, id))
        .returning();

      if (updatedAcademicYear[0].is_current) {
        await tx.update(schema.academicYear)
          .set({ is_current: false })
          .where(and(
            eq(schema.academicYear.is_current, true),
            not(eq(schema.academicYear.id, id))
          ));
      }
       return updatedAcademicYear;
    });

   
  } catch (error) {
    console.error('Error updating academic year:', error);
  }
  }

  async remove(id: number) {
    return await this.db.delete(schema.academicYear) .where(eq(schema.academicYear.id, id)).returning();
  }
}
