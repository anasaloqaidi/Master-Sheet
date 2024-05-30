import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService,...drizzleProvider],
})
export class SubjectModule {}
