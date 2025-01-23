import express, { Request, Response } from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import sessionMiddleware from "./config/sessionConfig.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app = express();
connectdb();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(sessionMiddleware);



app.use("/api/users", authRoutes);
app.use("/products", productRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});