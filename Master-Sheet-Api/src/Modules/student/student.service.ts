import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../drizzle/schema";
import * as bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";

@Injectable()
export class StudentService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const students = await Promise.all(
      createStudentDto.students.map(async (student) => {
        const existingUser = await this.db
          .select()
          .from(schema.student)
          .where(eq(schema.student.email, student.email));

        if (existingUser.length > 0) {
          throw new BadRequestException("البريد الألكتروني مستخدم");
        }

        student.password = await this.hashPassword(student.password);
        return student;
      })
    );

    try {
      const createdStudents = await this.db.transaction(async (tx) => {
        // Insert students into 'student' table
        const insertedStudents = await tx
          .insert(schema.student)
          .values(students)
          .returning();

        // Prepare data for 'studentStage' table insertion
        const studentStageValues = insertedStudents.map((student) => ({
          student_id: student.id,
          academic_year_id: createStudentDto.academic_year_id,
          status: createStudentDto.status,
          stage_id: createStudentDto.stage_id,
        }));

        await tx
          .insert(schema.studentStage)
          .values(studentStageValues)
          .returning();

        // Attach academic year and status to each student object
        return insertedStudents.map((student) => ({
          
            ...student
          ,
          studentStages:[{
          academic_year_id: createStudentDto.academic_year_id,
          status: createStudentDto.status,
          stage_id: createStudentDto.stage_id,
        }]}));
      });

      return createdStudents;
    } catch (error) {
      console.error("Error creating students:", error);
      throw new InternalServerErrorException("حدث خطأ أثناء إنشاء الطلاب");
    }
  }

  async findAll(department_id:number) {
    console.log(department_id)
     const currentAcademicYear = await this.db.select().from(schema.academicYear).where(eq(schema.academicYear.is_current,true));
     return await this.db.query.student.findMany({
      where: (student, { eq }) => eq(student.department_id, department_id),
      with: {
      studentStages:{
        where: (studentStage, { eq }) => (eq(studentStage.academic_year_id, currentAcademicYear[0].id)),
      }
      },
    });
  }

  async findOne(id: number) {
    return await this.db
      .select()
      .from(schema.student)
      .where(eq(schema.student.id, id));
  }

  async findOneByEmail(email: string) {
    return await this.db
      .select()
      .from(schema.student)
      .where(eq(schema.student.email, email));
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.db
      .update(schema.student)
      .set(updateStudentDto)
      .where(eq(schema.student.id, id))
      .returning();
  }

  async remove(id: number) {
    return await this.db
      .delete(schema.student)
      .where(eq(schema.student.id, id))
      .returning();
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
