import { z } from "zod";



const envSchema = z.object({
    DATABSE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    PORT: z.coerce.number().default(3001),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export const emv = envSchema.parse(process.env);