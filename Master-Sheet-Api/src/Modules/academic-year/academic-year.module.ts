import { Module } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { AcademicYearController } from './academic-year.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [AcademicYearController],
  providers: [AcademicYearService,...drizzleProvider],
  exports:[AcademicYearService]
})
export class AcademicYearModule {}
