import { Module } from '@nestjs/common';
import { PreparingSubjectService } from './preparing-subject.service';
import { PreparingSubjectController } from './preparing-subject.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [PreparingSubjectController],
  providers: [PreparingSubjectService,...drizzleProvider],
  exports:[PreparingSubjectService]
})
export class PreparingSubjectModule {}
