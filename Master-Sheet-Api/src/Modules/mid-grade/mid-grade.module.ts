import { Module } from '@nestjs/common';
import { MidGradeService } from './mid-grade.service';
import { MidGradeController } from './mid-grade.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { StudentModule } from '../student/student.module';

@Module({
  imports:[StudentModule],
  controllers: [MidGradeController],
  providers: [MidGradeService,...drizzleProvider],
})
export class MidGradeModule {}
