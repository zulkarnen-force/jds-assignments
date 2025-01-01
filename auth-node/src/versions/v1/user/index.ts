import { Router } from "express";
import { UserController } from "./UserController";
import { register } from "./UserSchema";
import { validateRequest } from "@middleware/validateRequest";
import UserUsecase from "./UserUsecase";
import { UserPsqlRepo } from "./UserRepo";
export const r = Router();

const u = new UserUsecase(new UserPsqlRepo());
const c = new UserController(u);

r.post("/", validateRequest(register), c.create.bind(c));

export default r;
