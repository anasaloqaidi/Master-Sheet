import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { eq } from 'drizzle-orm';

@Injectable()
export class DepartmentService {
  constructor(@Inject(DrizzleAsyncProvider) private db:NodePgDatabase<typeof schema>){}


  async create(createDepartmentDto: CreateDepartmentDto[]) {
    return await this.db.insert(schema.department).values(createDepartmentDto).returning();
  }

  async findAll() {
    return await this.db.query.department.findMany();
  }

  async findOne(id: number) {
    return await this.db.select().from(schema.department).where(eq(schema.department.id, id));

  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.db.update(schema.department) .set(updateDepartmentDto) .where(eq(schema.department.id, id)).returning();
  }

  async remove(id: number) {
    return await this.db.delete(schema.department) .where(eq(schema.department.id, id)).returning();
  }
}
