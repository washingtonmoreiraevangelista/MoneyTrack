import { TransactionRepository } from "../repository/registerTransaction.repository";
import { AuthRequest } from "../@types/authRequest";
import {
  CreateTransaction,
  DeleteTransactions,
  GetTrasanctionsUsers,
} from "../services";
import { Response } from "express";
import { calculateDashboard } from "../utils/calculateDashboard";

export async function transaction(req: AuthRequest, res: Response) {
  try {
    const { title, amount, type, category } = req.body;

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const amountFormatted = Number(String(amount).replace(",", "."));

    const createdTransactions = new CreateTransaction(
      new TransactionRepository(),
    );

    const transaction = await createdTransactions.create({
      userId,
      title,
      amount: amountFormatted,
      type,
      category,
    });

    return res.status(201).json(transaction);
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function getTransaction(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    const getAllTrasanctionsUser = new GetTrasanctionsUsers(
      new TransactionRepository(),
    );
    const transaction = await getAllTrasanctionsUser.findTransaction(userId);
    return res.status(200).json(transaction);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function balanceTransaction(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const getAllTrasanctionsUser = new GetTrasanctionsUsers(
      new TransactionRepository(),
    );

    const transaction = await getAllTrasanctionsUser.findTransaction(userId);

    const balance = calculateDashboard(transaction.listTransaction);

    console.log("balance:", balance);

    return res.status(200).json(balance);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteTransaction(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const repository = new TransactionRepository();
    const deleteService = new DeleteTransactions(repository);

    const result = await deleteService.deleteTransactions(id);

    console.log("resultado:", result);

    return res.status(200).json({ message: "Deletado com sucesso" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
