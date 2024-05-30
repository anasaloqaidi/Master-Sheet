import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [StudentController ],
  providers: [StudentService,...drizzleProvider],
  exports:[StudentService]
})
export class StudentModule {}
