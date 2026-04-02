import { randomUUID } from "crypto";
import { Transaction } from "../@types/transaction.type";
import { readData, writeData } from "../utils/fileHandler";
import { TransactionFilters } from "../model";

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

  async findByUserId(filters: TransactionFilters) {
    const db = readData();

    const allTransaction = db.transaction || [];

    let listTransaction = allTransaction.filter(
      (t: any) => t.userId === filters.userId,
    );

    //filtro por categoria
    if (filters.category) {
      listTransaction = listTransaction.filter(
        (e: any) => e.category === filters.category,
      );
    }

    // filtro por data .
    if (filters.startDate && filters.endDate) {
      listTransaction = listTransaction.filter((e: any) => {
        const date = new Date(e.date);
        return (
          date >= new Date(filters.startDate!) &&
          date <= new Date(filters.endDate!)
        );
      });
    }

    // agrupamento por categoria
    if (filters.groupBy === "category") {
      //Preparação e o Objeto de Acúmulo chave=string | valor= number
      const grouped: Record<string, number> = {};

      listTransaction.forEach((t: any) => {
        // separa income e expense
        const key = `${t.type}-${t.category}`;

        grouped[key] = (grouped[key] || 0) + t.amount;
      });

      //Object.entries(grouped): Transforma o objeto em uma lista de pares: [["income-salario", 5000], ["expense-aluguel", 1200]]
      return Object.entries(grouped).map(([key, total]) => {
        const [type, category] = key.split("-");

        return {
          type,
          category,
          total,
        };
      });
    }

    // agrupamento por mes
    if (filters.groupBy === "month") {
      const grouped: Record<string, number> = {};
      listTransaction.forEach((t: any) => {
        
        //.getMonth() + 1: Este é um detalhe crucial. No JavaScript, os meses começam em 0 (Janeiro é 0, Fevereiro é 1...). Somar +1 ajusta para o formato humano padrão (Janeiro = 1, Dezembro = 12).
        const date = new Date(t.createdDate);
        const month = date.getMonth() + 1;

        grouped[month] = (grouped[month] || 0) + t.amount;
      });

      return Object.entries(grouped).map(([month, total]) => ({
        month,
        total,
      }));
    }

    return listTransaction;
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
