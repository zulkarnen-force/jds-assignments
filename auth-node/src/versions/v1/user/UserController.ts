import { NextFunction, Request, Response } from "express";
import UResponse from "@utils/response";
import Userusecase from "./UserUsecase";

export class UserController {
  constructor(private usecase: Userusecase) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.usecase.create(req);
      return UResponse.saved(res, result);
    } catch (error: Error | any) {
      next(error);
    }
  }
}
