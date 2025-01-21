import express from "express";
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
  Credentials: true,
};
app.use(cors(corsOptions));
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/products", productRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
