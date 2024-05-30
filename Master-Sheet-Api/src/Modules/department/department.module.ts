import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService,...drizzleProvider],
})
export class DepartmentModule {}
