import { NextFunction, Response } from "express";
import { AuthRequest } from "../@types/authRequest";

export function isAdminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Acesso negado" });
  }

  next();
}
