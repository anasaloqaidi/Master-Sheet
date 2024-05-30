import { Module } from '@nestjs/common';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { StudentModule } from '../student/student.module';
import { FinalGradeController } from './final-grade.controller';
import { FinalGradeService } from './final-grade.service';

@Module({
  imports:[StudentModule],
  controllers: [FinalGradeController],
  providers: [FinalGradeService,...drizzleProvider],
})
export class FinalGradeModule {}
