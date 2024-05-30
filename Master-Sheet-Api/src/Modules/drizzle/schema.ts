import { relations } from "drizzle-orm";
import { pgTable, serial, text , smallint , date , boolean , pgEnum , varchar , integer , primaryKey } from "drizzle-orm/pg-core";


export const college = pgTable("college", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    success_grade: smallint("success_grade").default(50),
    is_configure: boolean("is_configure"),
});

export const collegeRelations = relations(college, ({ many }) => ({
  departments: many(department),
  stages: many(stage),
  subjects: many(subject),
  academicYears: many(academicYear),
}));

export const department = pgTable("department", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    college_id: integer("college_id").references(() => college.id).notNull()
});


export const departmentRelations = relations(department, ({ one , many}) => ({
  college: one(college, {
    fields: [department.college_id],
    references: [college.id],
  }),
  students: many(student),

  users: many(user),

  preparingSubjects: many(preparingSubject),

}));

export const stage = pgTable("stage", {
    id: serial("id").primaryKey(),
    name: varchar("name",{ length: 50 }).notNull(),
    order: smallint('order').unique(),
    college_id: integer("college_id").references(() => college.id).notNull()
});

export const stageRelations = relations(stage, ({ one , many}) => ({
  college: one(college, {
    fields: [stage.college_id],
    references: [college.id],
  }),
  midGrades: many(midGrade),

  finalGrades: many(finalGrade), 


  reFinalGrades: many(reFinalGrade),

  studentStages: many(studentStage),

  preparingSubjects: many(preparingSubject),

}));

export const subject = pgTable("subject", {
    code : text("code").primaryKey(),
    name_english : varchar("name_english",{length: 50}).notNull(),
    name_arabic : varchar("name_arabic",{length: 50}).notNull(),
    college_id: integer("college_id").references(() => college.id).notNull()
});

export const subjectRelations = relations(subject, ({ one , many}) => ({
  college: one(college, {
    fields: [subject.college_id],
    references: [college.id],
  }),
  midGrades: many(midGrade),

  finalGrades: many(finalGrade),

  reFinalGrades: many(reFinalGrade),

  preparingSubjects: many(preparingSubject),

}));


export const academicYear = pgTable("academic_year", {
    id: serial("id").primaryKey(),
    name : varchar("name",{length: 50}).notNull(),
    start_date: date('start_date', { mode: "string" }).notNull(),
    end_date: date('end_date', { mode: "string" }).notNull(),
    college_id: integer("college_id").references(() => college.id).notNull(),
    is_current: boolean('is_current').notNull(),
});


export const academicYearRelations = relations(academicYear, ({ one , many}) => ({
  college: one(college, {
    fields: [academicYear.college_id],
    references: [college.id],
  }),
  students: many(student),

  midGrades: many(midGrade),

  finalGrades: many(finalGrade),

  reFinalGrades: many(reFinalGrade),

  studentStages: many(studentStage),

  preparingSubjects: many(preparingSubject),

}));

export const studyType = pgEnum('study_type', ['مسائي', 'صباحي']);

export const genderType = pgEnum('gender_type', ['ذكر', 'أنثى']);

export const semesterType = pgEnum('semester_type', ['الأول', 'الثاني']);

export const userRole = pgEnum('userRole', ['عميد الكلية', 'رئيس القسم', 'عضو']);

export const status = pgEnum('status', ['تحميل', 'أستأنف', 'أستمرار','ترقين القيد','تخرج']);

export const student = pgTable("student", {
    id: serial("id").primaryKey(),
    first_name : varchar("first_name").notNull(),
    middle_name : varchar("middle_name").notNull(),
    last_name : varchar("last_name").notNull(),
    photo : varchar("photo").default(""),
    email : varchar("email").notNull().unique(),
    password : varchar("password").notNull(),
    birthday: date('birthday', { mode: "string" }).notNull(),
    study_type: studyType('study_type'),
    gender: genderType('gender'),
    enrollment_year_id: integer("enrollment_year_id").references(() => academicYear.id).notNull(),
    department_id: integer("department_id").references(() => department.id).notNull()
});

export const studentRelations = relations(student, ({ one , many}) => ({
  department: one(department, {
    fields: [student.department_id],
    references: [department.id],
  }),

  enrollmentYear: one(academicYear, {
    fields: [student.enrollment_year_id],
    references: [academicYear.id],
  }),

  midGrades: many(midGrade),

  finalGrades: many(finalGrade),

  reFinalGrades: many(reFinalGrade),

  studentStages: many(studentStage),


}));


export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    first_name : varchar("first_name").notNull(),
    middle_name : varchar("middle_name").notNull(),
    last_name : varchar("last_name").notNull(),
    birthday: date('birthday', { mode: "string" }).notNull(),
    photo : varchar("photo").default(''),
    email : varchar("email").notNull().unique(),
    password : varchar("password").notNull(),
    gender: genderType('gender'),
    is_active: boolean('is_active').notNull(),
    role: userRole('role'),
    department_id: integer("department_id").references(() => department.id)
});

export const userRelations = relations(user, ({ one , many}) => ({
  department: one(department, {
    fields: [user.department_id],
    references: [department.id],
  }),
}));

export const gradeRange = pgTable("grade_range", {
    name : text("name").primaryKey(),
    min_range : smallint("min_range").notNull(),
    max_range : smallint("max_range").notNull(),
});

export const midGrade = pgTable("mid_grade", {
    subject_code: text("subject_code").references(() => subject.code).notNull(),
    academic_year_id: integer("academic_year_id").references(() => academicYear.id).notNull(),
    student_id: integer("student_id").references(() => student.id).notNull(),
    stage_id: integer("stage_id").references(() => stage.id).notNull(),
    semester:semesterType("semester").notNull(),
    grade:smallint("grade").notNull(), 
}, (table) => {
    return {
      pk: primaryKey({ columns: [table.subject_code,table.student_id] }),
    };
  });
  export const midGradeRelations = relations(midGrade, ({ one }) => ({
    subject: one(subject, {
      fields: [midGrade.subject_code],
      references: [subject.code],
    }),
  
    academicYear: one(academicYear, {
      fields: [midGrade.academic_year_id],
      references: [academicYear.id],
    }),
    student: one(student, {
      fields: [midGrade.student_id],
      references: [student.id],
    }),
    stage: one(stage, {
      fields: [midGrade.stage_id],
      references: [stage.id],
    }),
  
  }));

  export const finalGrade = pgTable("final_grade", {
    subject_code: text("subject_code").references(() => subject.code).notNull(),
    academic_year_id: integer("academic_year_id").references(() => academicYear.id).notNull(),
    student_id: integer("student_id").references(() => student.id).notNull(),
    stage_id: integer("stage_id").references(() => stage.id).notNull(),
    semester:semesterType("semester").notNull(),
    grade:smallint("grade").notNull(), 
}, (table) => {
    return {
      pk: primaryKey({ columns: [table.subject_code,table.student_id] }),
    };
  });

  export const finalGradeRelations = relations(finalGrade, ({ one }) => ({
    subject: one(subject, {
      fields: [finalGrade.subject_code],
      references: [subject.code],
    }),
  
    academicYear: one(academicYear, {
      fields: [finalGrade.academic_year_id],
      references: [academicYear.id],
    }),
    student: one(student, {
      fields: [finalGrade.student_id],
      references: [student.id],
    }),
    stage: one(stage, {
      fields: [finalGrade.stage_id],
      references: [stage.id],
    }),
  
  }));

  export const reFinalGrade = pgTable("re_final_grade", {
    subject_code: text("subject_code").references(() => subject.code).notNull(),
    academic_year_id: integer("academic_year_id").references(() => academicYear.id).notNull(),
    student_id: integer("student_id").references(() => student.id).notNull(),
    stage_id: integer("stage_id").references(() => stage.id).notNull(),
    semester:semesterType("semester").notNull(),
    grade:smallint("grade").notNull(), 
}, (table) => {
    return {
      pk: primaryKey({ columns: [table.subject_code,table.student_id] }),
    };
  });

  export const reFinalGradeRelations = relations(reFinalGrade, ({ one }) => ({
    subject: one(subject, {
      fields: [reFinalGrade.subject_code],
      references: [subject.code],
    }),
  
    academicYear: one(academicYear, {
      fields: [reFinalGrade.academic_year_id],
      references: [academicYear.id],
    }),
    student: one(student, {
      fields: [reFinalGrade.student_id],
      references: [student.id],
    }),
    stage: one(stage, {
      fields: [reFinalGrade.stage_id],
      references: [stage.id],
    }),
  
  }));

  export const studentStage = pgTable("student_stage", {
    academic_year_id: integer("academic_year_id").references(() => academicYear.id).notNull(),
    student_id: integer("student_id").references(() => student.id,{onDelete: 'cascade'}).notNull(),
    stage_id: integer("stage_id").references(() => stage.id).notNull(),
    status:status("status").notNull(),
}, (table) => {
    return {
      pk: primaryKey({ columns: [table.stage_id, table.academic_year_id,table.student_id] }),
    };
  });

  export const studentStageRelations = relations(studentStage, ({ one }) => ({
  
    academicYear: one(academicYear, {
      fields: [studentStage.academic_year_id],
      references: [academicYear.id],
    }),
    student: one(student, {
      fields: [studentStage.student_id],
      references: [student.id],
    }),
    stage: one(stage, {
      fields: [studentStage.stage_id],
      references: [stage.id],
    }),
  
  }));



  export const preparingSubject = pgTable("preparing_subject", {
    subject_code: text("subject_code").references(() => subject.code).notNull(),
    academic_year_id: integer("academic_year_id").references(() => academicYear.id).notNull(),
    stage_id: integer("stage_id").references(() => stage.id).notNull(),
    semester:semesterType("semester").notNull(),
    department_id: integer("department_id").references(() => department.id).notNull(),
    subject_weight:smallint("subject_weight").notNull(),
    limit_of_mid:smallint("limit_of_mid").notNull(),
    limit_of_final:smallint("limit_of_final").notNull(),
}, (table) => {
    return {
      pk: primaryKey({ columns: [table.subject_code, table.academic_year_id,table.stage_id,table.department_id] }),
    };
  });

  
  export const preparingSubjectRelations = relations(preparingSubject, ({ one }) => ({
    subject: one(subject, {
      fields: [preparingSubject.subject_code],
      references: [subject.code],
    }),
    department: one(department, {
      fields: [preparingSubject.department_id],
      references: [department.id],
    }),
  
    academicYear: one(academicYear, {
      fields: [preparingSubject.academic_year_id],
      references: [academicYear.id],
    }),
    stage: one(stage, {
      fields: [preparingSubject.stage_id],
      references: [stage.id],
    }),
  
  }));
