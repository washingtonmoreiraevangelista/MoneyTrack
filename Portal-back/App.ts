import express from "express"
import {UserRouter } from "./router/User.router"
import { TransactionRouter } from "./router/transaction.router"

export const app = express()


app.use(express.json())

app.use("/users", UserRouter)
app.use("/transactions", TransactionRouter)

// criar midlleware de valida o token
/* import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // O padrão é "Bearer <TOKEN>"
  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET);
    
    // Opcional: Anexar os dados do token na requisição para usar depois
    (req as any).user = decoded;

    return next(); // Libera para a próxima função (o Controller)
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}*/