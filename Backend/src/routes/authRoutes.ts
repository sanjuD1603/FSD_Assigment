import express from "express";
import { body } from "express-validator";
import {
  signInRoute,
  signUpRoute,
  getSessionUser,
} from "../controllers/authController.js";

const router = express.Router();

const signUpValidation = [
  body("username").isEmail().withMessage("Username must be a valid Email id"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characetrs"),
];

const signInValidation = [
  body("username").isEmail().withMessage("Username must be a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/signup", signInValidation, signUpRoute);
router.post("/signin", signUpValidation, signInRoute);
router.get("/user", getSessionUser);

export default router;
