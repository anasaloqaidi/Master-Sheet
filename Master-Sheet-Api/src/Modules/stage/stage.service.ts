import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema'
import { eq } from 'drizzle-orm';

@Injectable()
export class StageService {
  constructor(@Inject(DrizzleAsyncProvider) private db:NodePgDatabase<typeof schema>){}

  async create(createStageDto: CreateStageDto[]) {
    if (!Array.isArray(createStageDto)) {
      // If input is not an array, handle it as a single object
      return this.createSingleStage(createStageDto);
    }
  
    const stages = await Promise.all(
      createStageDto.map(async (stage) => {
        const existingStage = await this.db
          .select()
          .from(schema.stage)
          .where(eq(schema.stage.order, stage.order));
  
        if (existingStage.length > 0) {
          throw new BadRequestException('الترتيب مستخدم');
        }
        return stage;
      })
    );
  
    return await this.db.insert(schema.stage).values(stages).returning();
  }
  
  private async createSingleStage(createStageDto: CreateStageDto) {
    const { order } = createStageDto;
  
    const existingStage = await this.findByOrder(order);
  
    if (existingStage.length > 0) {
      throw new BadRequestException('الترتيب مستخدم');
    }
    return await this.db.insert(schema.stage).values(createStageDto).returning();
  }


  async findAll() {
    return await this.db.query.stage.findMany();
  }

  async findOne(id: number) {
    return await this.db.select().from(schema.stage).where(eq(schema.stage.id, id));
  }

  async findByOrder(order: number) {
    return await this.db.select().from(schema.stage).where(eq(schema.stage.order, order));
  }

  async update(id: number, updateStageDto: UpdateStageDto) {
    return await this.db.update(schema.stage) .set(updateStageDto) .where(eq(schema.stage.id, id)).returning();
  }

  async remove(id: number) {
    return await this.db.delete(schema.stage) .where(eq(schema.stage.id, id)).returning();
  }
}
