import "dotenv/config";
import express, { type Express } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { router as productRouter } from "./routes/product.route.js";
import { auth } from "./lib/auth.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { apiLimiter } from "./middlewares/rate-limit.js";
import { pinoHttp } from "pino-http";
import {logger} from "./lib/logger.js"

const app: Express = express();

// 1. CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// 2. Auth handler HARUS sebelum body parser
app.all("/api/auth/*path", toNodeHandler(auth));

// 3. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 Coffee Shop API is running smoothly!",
  });
});

app.use("/api/products", productRouter);

// 4. Error handler PALING AKHIR
app.use(errorHandler);

// 5. Rate Limit
app.use("/api", apiLimiter);

// 6. Request Logger
app.use(pinoHttp({logger}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
