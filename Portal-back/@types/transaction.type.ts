const categories = {
  house: 0,
  food: 0,
  investment: 0,
  leisure: 0,
  others: 0,
};

type Category = keyof typeof categories;

export type Transaction = {
  userId: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: Category;
  createdDate: Date;
};
