import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService,...drizzleProvider],
})
export class CollegeModule {}
