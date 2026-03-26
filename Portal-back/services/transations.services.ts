import { TransactionRepository } from "../repository";
import { Transaction } from "../@types/transaction.type";

export class CreateTransaction {
  constructor(private transactionRepository: TransactionRepository) {}

  async create(data: Omit<Transaction, "createdDate">) {
    const transaction = await this.transactionRepository.create({
      ...data,
      createdDate: new Date(),
    });

    return transaction;
  }
}

export class GetTrasanctionsUsers {
  constructor(private transactionRepository: TransactionRepository) {}

  async findTransaction(userId: string) {
    const transaction = await this.transactionRepository.findByUserId(userId);
    return transaction;
  }
}   

export class DeleteTransactions {
  constructor(private transactionRepository: TransactionRepository) {}

  async deleteTransactions(id: string) {
    const result = await this.transactionRepository.delete(id);
    return result;
  }
}
