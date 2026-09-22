import { z } from "zod";

export const orderSchema = z.object({
  id: z.string(),
  customer: z.string(),
  email: z.string().email(),
  product: z.string(),
  quantity: z.number(),
  amount: z.string(),
  status: z.enum(["Completed", "Processing", "Pending", "Cancelled"]),
  paymentMethod: z.string(),
  date: z.string(),
});

export type Order = z.infer<typeof orderSchema>;