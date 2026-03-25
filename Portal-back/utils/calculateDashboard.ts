import { Transaction } from "../@types/transaction.type";

export const calculateDashboard = (transactions: Transaction[]) => {
  let balance = 0;
  let income = 0;
  let expense = 0;
  let vault = 0;

  const categories: Record<string, number> = {};

  for (const t of transactions) {
    const amount = Number(String(t.amount).replace(",", ".")) || 0;

    // entrada
    if (t.type === "income") {
      income += amount;
      balance += amount;
    } 
    // saída
    else {
      expense += amount;
      balance -= amount;

      // categorias só para despesas
      if (!categories[t.category]) {
        categories[t.category] = 0;
      }

      categories[t.category] += amount;

      // cofre (investment)
      if (t.category === "investment") {
        vault += amount;
      }
    }
  }

  const percentages: Record<string, number> = {};

  for (const key in categories) {
    percentages[key] =
      expense > 0 ? (categories[key] / expense) * 100 : 0;
  }

  return {
    balance,
    income,
    expense,
    categories,
    percentages,
    vault, 
  };
};