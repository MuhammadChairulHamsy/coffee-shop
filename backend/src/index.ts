import dotenv from "dotenv";
import productRoutes from "./routes/product.route";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Coffee Shop API is running smoothly!"
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


app.use("/api/products", productRoutes);