import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./verify-jwt";

const SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verifyToken(token);

    (req as any).user = {
      userId: decoded.sub,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
