import { TransactionRepository } from "../repository";
import { Transaction } from "../@types/transaction.type";
import { TransactionFilters } from "../model";

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

  async findTransaction(filters: TransactionFilters) {
    const transaction = await this.transactionRepository.findByUserId(filters);
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
