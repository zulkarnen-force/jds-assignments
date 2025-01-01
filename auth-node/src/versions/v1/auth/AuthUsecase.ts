import { User } from "@prisma/client";
import { Request } from "express";
import UserRepo from "../user/UserRepo";
import { generateToken } from "@lib/jwt/validateJwt";
import UserEntity from "../user/UserEntity";

export default class AuthUsecase {
  constructor(private repo: UserRepo<User>) {}

  async register(request: Request) {
    try {
      const user = new UserEntity(request.body);
      if (user.getName() === "admin") {
        user.setRole("admin");
      }
      await this.repo.create(user.getUserDataForDatabase());
      return user.getUserData();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  async login(request: Request) {
    try {
      const user = await this.repo.findByNik(request.body.nik);
      if (!user.verifyPassword(request.body.password)) {
        throw new Error("Invalid password");
      }
      return generateToken({
        name: user.getName(),
        nik: user.getNik(),
        role: user.getRole(),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  async me(request: Request) {
    try {
      return request.user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}
