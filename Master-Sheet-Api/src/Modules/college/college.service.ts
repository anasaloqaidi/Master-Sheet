import { Inject, Injectable } from '@nestjs/common';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { eq } from 'drizzle-orm';

@Injectable()
export class CollegeService {
  constructor(@Inject(DrizzleAsyncProvider) private db:NodePgDatabase<typeof schema>){}

  async create(createCollegeDto: CreateCollegeDto) {
    return await this.db.insert(schema.college).values(createCollegeDto).returning();
  }

  async findAll() {
    return await this.db.query.college.findFirst();
  }


  async update(id: number, updateCollegeDto: UpdateCollegeDto) {
    return await this.db.update(schema.college) .set(updateCollegeDto) .where(eq(schema.college.id, id)).returning();
  }


}
