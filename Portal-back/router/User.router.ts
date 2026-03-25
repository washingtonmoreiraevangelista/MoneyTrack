import { Router } from "express";
import { loginUser, registerUsers } from "../controller/users.controller";

export const UserRouter = Router();

UserRouter.post("/register", registerUsers);
UserRouter.post("/login", loginUser);
