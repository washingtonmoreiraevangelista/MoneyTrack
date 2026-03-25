import { randomUUID } from "crypto";
import { Transaction } from "../@types/transaction.type";
import { readData, writeData } from "../utils/fileHandler";

export class TransactionRepository {
  async create(data: Transaction) {
    const db = readData();

    const transaction = db.transaction || [];

    const newTransaction = {
      id: randomUUID(),
      ...data,
    };

    transaction.push(newTransaction);

    writeData({
      ...db,
      transaction: transaction,
    });

    return newTransaction;
  }

  async findByUserId(userId: string) {
    const db = readData();

    const allTransaction = db.transaction || [];

    const listTransaction = allTransaction.filter(
      (t: any) => t.userId === userId,
    );

    return { listTransaction };
  }

  async delete(id: string) {
    const db = readData();

    const transaction = db.transaction || [];

    const index = transaction.findIndex((t: any) => t.id.trim() === id.trim());

    const deleted = transaction.splice(index, 1);

    db.transaction = transaction;
    writeData(db);

    return { deleted };
  }
}
