// src/index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { productRouter } from "./routes/product.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

// 1. CORS Paling Atas
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// 2. ROUTE AUTH HARUS DI SINI (Sebelum body parser)
app.all("/api/auth/*path", toNodeHandler(auth));

// 3. Body Parser di Bawah Auth
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Coffee Shop API is running smoothly!",
  });
});

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});