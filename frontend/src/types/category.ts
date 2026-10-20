export type CategoryStats = {
  name: string;
  description: string | null;
  productCount: number;
  totalValue: number;
  lastUpdated: string; 
  status: "active" | "empty";
};