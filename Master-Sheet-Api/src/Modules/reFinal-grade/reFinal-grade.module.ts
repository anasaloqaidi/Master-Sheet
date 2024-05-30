import { Module } from '@nestjs/common';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { StudentModule } from '../student/student.module';
import { ReFinalGradeController } from './reFinal-grade.controller';
import { ReFinalGradeService } from './reFinal-grade.service';

@Module({
  imports:[StudentModule],
  controllers: [ReFinalGradeController],
  providers: [ReFinalGradeService,...drizzleProvider],
})
export class ReFinalGradeModule {}
