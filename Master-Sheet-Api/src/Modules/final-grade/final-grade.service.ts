import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { StudentService } from "../student/student.service";
import { CreateFinalGradeDto } from "./dto/create-final-grade.dto";


@Injectable()
export class FinalGradeService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
    private studentService: StudentService
  ) {}

  async create(createFinalGradeDto: CreateFinalGradeDto[]) {
    try {
      return await this.db
        .insert(schema.finalGrade)
        .values(createFinalGradeDto)
        .onConflictDoUpdate({
          target: [schema.finalGrade.student_id,schema.finalGrade.subject_code],
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
      const FinalGrades = await this.db
        .select()
        .from(schema.finalGrade)
        .where(
          and(
            eq(schema.finalGrade.student_id, student.id),
            eq(schema.finalGrade.academic_year_id, currentAcademicYear[0].id)
          )
        );

      return FinalGrades;
    });

    // Wait for all promises to resolve using Promise.all()
    const results = await Promise.all(promises);

    // Flatten the 2D array of objects into a 1D array of objects
    const flattenedFinalGrades = results.flat();

    return flattenedFinalGrades;
  }

 
}
