import { NextFunction, Request, Response } from "express";
import UResponse from "@utils/response";
import AuthUsecase from "./AuthUsecase";

export class AuthController {
  constructor(private usecase: AuthUsecase) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.usecase.register(req);
      return UResponse.saved(res, result);
    } catch (error: Error | any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.usecase.login(req);
      return UResponse.success(res, result);
    } catch (error: Error | any) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.usecase.me(req);
      return UResponse.success(res, result);
    } catch (error: Error | any) {
      next(error);
    }
  }
}
