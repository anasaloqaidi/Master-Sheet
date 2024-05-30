import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [StageController],
  providers: [StageService,...drizzleProvider],
})
export class StageModule {}
