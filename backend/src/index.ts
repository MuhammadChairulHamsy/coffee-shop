import dotenv from "dotenv";
import { productRouter } from "./routes/product.route";
dotenv.config();

import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route";

const app = express();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Coffee Shop API is running smoothly!",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

