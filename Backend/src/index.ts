import express from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  Credentials: true,
};
app.use(cors(corsOptions));
app.use("/products", productRoutes);
connectdb();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
