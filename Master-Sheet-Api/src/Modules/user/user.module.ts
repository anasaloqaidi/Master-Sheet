import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  controllers: [UserController],
  providers: [UserService,...drizzleProvider],
  exports:[UserService]
})
export class UserModule {}
