import express, { Request, Response, NextFunction } from "express";
import connectdb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import sessionMiddleware from "./config/sessionConfig.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectdb();

const app = express();

const port = process.env.PORT || '5000';

const corsOptions = {
  origin: 'https://fsd-assigment.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS" ,"HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(sessionMiddleware);

app.use("/api/users", authRoutes);
app.use("/products", productRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
