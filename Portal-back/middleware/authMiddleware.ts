import { Request, Response, NextFunction } from "express";
import { verifyAccessToke } from "./verify-jwt";

const SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não informado" });
  }


  try {
    const payload = verifyAccessToke(token);

    (req as any).user = {
      userId: payload.sub,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
