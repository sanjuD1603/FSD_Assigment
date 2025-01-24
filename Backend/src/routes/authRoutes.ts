import express from "express";
import { body } from "express-validator";
import {
  signInRoute,
  signUpRoute,
  getSessionUser,
  logoutRoute,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const signUpValidation = [
  body("username").isEmail().withMessage("Username must be a valid Email id"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characetrs"),
];

const authRateLimiter = rateLimit({
  windowMs:5 * 60 * 1000,
  max:5,
  message: "Too many attemps, please try again after 5 minutes."
})
const signInValidation = [
  body("username").isEmail().withMessage("Username must be a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/signup",authRateLimiter, signInValidation, signUpRoute);
router.post("/signin",authRateLimiter, signUpValidation, signInRoute);
router.get("/user", getSessionUser);
router.get("/logout", logoutRoute);


export default router;
