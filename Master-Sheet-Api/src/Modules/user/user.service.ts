import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../drizzle/schema";
import * as bcrypt from "bcrypt";
import { and, eq, not } from "drizzle-orm";
import { UserRole } from "../drizzle/enums";

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
  ) {}

  async create(createUserDto: CreateUserDto[]) {
    if (!Array.isArray(createUserDto)) {
      // If input is not an array, handle it as a single object
      return this.createSingleUser(createUserDto);
    }

    const users = await Promise.all(
      createUserDto.map(async (user) => {
        const existingUser = await this.db
          .select()
          .from(schema.user)
          .where(eq(schema.user.email, user.email));

        if (existingUser.length > 0) {
          throw new BadRequestException("البريد الألكتروني مستخدم");
        }

        user.password = await this.hashPassword(user.password);
        return user;
      })
    );

    return await this.db.insert(schema.user).values(users).returning();
  }

  private async createSingleUser(user: CreateUserDto) {
    const { email, password } = user;

    const existingUser = await this.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, email));

    if (existingUser.length > 0) {
      throw new BadRequestException("البريد الألكتروني مستخدم");
    }

    user.password = await this.hashPassword(password);
    return await this.db.insert(schema.user).values(user).returning();
  }

  async findAll(user: any) {
   if(user.role===UserRole.Dean){
    return await this.db
      .select()
      .from(schema.user)
      .where(not(eq(schema.user.role, UserRole.Supervisor)));
    }else{
      return await this.db
      .select()
      .from(schema.user)
      .where(and(eq(schema.user.role, UserRole.Supervisor),eq(schema.user.department_id, user.department)));
    }
  }

  async findOne(id: number) {
    return await this.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id));
  }

  async findOneByEmail(email: string) {
    return await this.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, email));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.db
      .update(schema.user)
      .set(updateUserDto)
      .where(eq(schema.user.id, id))
      .returning();
  }

  async remove(id: number) {
    return await this.db
      .delete(schema.user)
      .where(eq(schema.user.id, id))
      .returning();
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
