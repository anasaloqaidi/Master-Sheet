import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  providers: [EmailService],
  exports:[EmailService],
})
export class EmailModule {}
