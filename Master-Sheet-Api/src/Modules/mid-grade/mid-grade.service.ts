import { Inject, Injectable } from "@nestjs/common";
import { CreateMidGradeDto } from "./dto/create-mid-grade.dto";
import { UpdateMidGradeDto } from "./dto/update-mid-grade.dto";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { StudentService } from "../student/student.service";

@Injectable()
export class MidGradeService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
    private studentService: StudentService
  ) {}

  async create(createMidGradeDto: CreateMidGradeDto[]) {
    try {
      return await this.db
        .insert(schema.midGrade)
        .values(createMidGradeDto)
        .onConflictDoUpdate({
          target: [schema.midGrade.student_id,schema.midGrade.subject_code],
          set: { grade: sql`EXCLUDED.grade` },
        })
        .returning();
    } catch (error) {
      console.error("Error updating mid Grade:", error);
    }
  }

  async findAll(department_id: number) {
    const currentAcademicYear = await this.db
      .select()
      .from(schema.academicYear)
      .where(eq(schema.academicYear.is_current, true));
    const students = await this.studentService.findAll(department_id);

    const promises = students.map(async (student) => {
      const midGrades = await this.db
        .select()
        .from(schema.midGrade)
        .where(
          and(
            eq(schema.midGrade.student_id, student.id),
            eq(schema.midGrade.academic_year_id, currentAcademicYear[0].id)
          )
        );

      return midGrades;
    });

    // Wait for all promises to resolve using Promise.all()
    const results = await Promise.all(promises);

    // Flatten the 2D array of objects into a 1D array of objects
    const flattenedMidGrades = results.flat();

    return flattenedMidGrades;
  }

  async update(updateMidGradeDto: UpdateMidGradeDto) {
    return await this.db
      .update(schema.midGrade)
      .set(updateMidGradeDto)
      .where(
        and(
          eq(schema.midGrade.student_id, updateMidGradeDto.student_id),
          eq(
            schema.midGrade.academic_year_id,
            updateMidGradeDto.academic_year_id
          ),
          eq(schema.midGrade.subject_code, updateMidGradeDto.subject_code)
        )
      )
      .returning();
  }
}
