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

const port = process.env.PORT || '5000'

const corsOptions = {
  origin: 'https://fsd-assignment.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use("/api/users", authRoutes);
app.use("/products", productRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
