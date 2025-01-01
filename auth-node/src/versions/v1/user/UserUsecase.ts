import { User } from "@prisma/client";
import UserRepo from "./UserRepo";
import { Request } from "express";
import UserEntity from "./UserEntity";

export default class UserUsecase {
  constructor(private repo: UserRepo<User>) {}

  async create(request: Request) {
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
}
