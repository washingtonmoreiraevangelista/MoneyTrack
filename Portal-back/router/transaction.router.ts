import { Router } from "express";
import {
  balanceTransaction,
  deleteTransaction,
  getTransaction,
  transaction,
} from "../controller/transaction.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const TransactionRouter = Router();

TransactionRouter.post("/", authMiddleware, transaction);
TransactionRouter.get("/get-transactions", authMiddleware, getTransaction);
TransactionRouter.get("/balance", authMiddleware, balanceTransaction);
TransactionRouter.delete("/:id", authMiddleware, deleteTransaction);
