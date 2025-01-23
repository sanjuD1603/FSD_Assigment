import express, { Request, Response, NextFunction } from "express";
import { getAllProducts , addProduct} from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

router.get("/", isAuthenticated, asyncHandler(getAllProducts));
router.post("/addProduct", isAuthenticated, asyncHandler(addProduct));

export default router;