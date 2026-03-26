import { Router } from "express";
import { loginUser, registerUsers, updateUser } from "../controller/users.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const UserRouter = Router();

UserRouter.post("/register", registerUsers);
UserRouter.post("/login", loginUser);
UserRouter.put("/profile/:id", authMiddleware, updateUser);

