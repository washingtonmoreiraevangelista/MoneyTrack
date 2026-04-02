export interface TransactionFilters {
  userId: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  groupBy?: "category" | "month";
};