import { z } from "zod";

export const categoryStatsSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  productCount: z.number(),
  totalValue: z.number(),
  lastUpdated: z.string(),
  status: z.enum(["active", "empty"]),
});

export type CategoryStats = z.infer<typeof categoryStatsSchema>;