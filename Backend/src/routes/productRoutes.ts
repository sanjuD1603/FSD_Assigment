import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", isAuthenticated, getAllProducts);

export default router;
