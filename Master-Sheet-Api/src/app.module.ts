import { Module } from '@nestjs/common';
import { AcademicYearModule } from './Modules/academic-year/academic-year.module';
import { DrizzleModule } from './Modules/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './Modules/user/user.module';
import { AuthModule } from './Modules/auth/auth.module';
import { CollegeModule } from './Modules/college/college.module';
import { SubjectModule } from './Modules/subject/subject.module';
import { StageModule } from './Modules/stage/stage.module';
import { DepartmentModule } from './Modules/department/department.module';
import { StudentModule } from './Modules/student/student.module';
import { PreparingSubjectModule } from './Modules/preparing-subject/preparing-subject.module';
import { MidGradeModule } from './Modules/mid-grade/mid-grade.module';
import { FinalGradeModule } from './Modules/final-grade/final-grade.module';
import { ReFinalGradeModule } from './Modules/reFinal-grade/reFinal-grade.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        secure: false, 
        auth: {
          user: process.env.EMAIL_USERNAME, 
          pass: process.env.EMAIL_PASSWORD 
        },
      },
    }),
    AuthModule,
    DrizzleModule,
    AcademicYearModule,
    UserModule,
    CollegeModule,
    SubjectModule,
    StageModule,
    DepartmentModule,
    StudentModule,
    PreparingSubjectModule,
    MidGradeModule,
    FinalGradeModule,
    ReFinalGradeModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
