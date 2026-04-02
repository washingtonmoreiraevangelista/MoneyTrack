import { Router } from "express";
import { registerUsers, updateUser } from "../controller/users.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { loginUser, refresh } from "../controller";

export const UserRouter = Router();

UserRouter.post("/register", registerUsers);
UserRouter.post("/login", loginUser);
UserRouter.patch("/profile/:id", authMiddleware, updateUser);
UserRouter.post("/refreshToken",authMiddleware, refresh);

