import { User } from "@prisma/client";
import { prismaClient } from "../../../application/database";
import { UserWithPassword } from "@type/User";
import UserEntity from "./UserEntity";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequest } from "@type/ApiError";

export default interface UserRepo<T> {
  create: (user: UserWithPassword) => Promise<UserWithPassword>;
  findByNik: (nik: string) => Promise<UserEntity>;
}

export class UserPsqlRepo implements UserRepo<User> {
  async findByNik(nik: string): Promise<UserEntity> {
    try {
      const r = await prismaClient.user.findFirst({
        where: {
          nik,
        },
      });
      if (!r) throw new Error("Records not found");
      return new UserEntity({
        name: r.name ?? "",
        nik: r.nik ?? "",
        role: r.role ?? "user",
        hashPassword: r.password ?? "",
        plainPassword: r.password ?? "",
      });
    } catch (error) {
      throw error;
    }
  }

  async create(user: UserWithPassword): Promise<User> {
    try {
      const r = await prismaClient.user.create({
        data: user,
      });
      if (!r) throw new Error("User not created");
      return r;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new BadRequest("User already exists");
        }
      }
      throw error;
    }
  }
}
