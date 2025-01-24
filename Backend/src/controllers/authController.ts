import { Request, Response } from "express";
import { cookie, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const signUpRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { name, username, password, isAdminUser } = req.body;
  // console.log(name, username, password, isAdminUser);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        error: "User already exists. Please log in.",
      });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      isAdminUser,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        isAdminuser: newUser.isAdminUser,
      },
    });
    return;
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const signInRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }

  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        error: "User not found. Please register.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        error: "Invalid credentials. Please try again.",
      });
      return;
    }
    console.log("User Found!!", user);
    req.session.user = {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      isAdminUser: user.isAdminUser,
    };
    console.log("user saved to session ", req.session.user);

    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
    });

    res.status(200).json({
      message: "Sign-in successful",
      user: req.session.user,
    });
    return;
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({
      error: "Internal Server Error",
      user: req.session.user,
      cookie: req.session.cookie,
    });
    return;
  }
};

export const getSessionUser = (req: Request, res: Response): Promise<void> => {
  if (req.session && req.session.user) {
    res.status(200).json({
      user: req.session.user,
    });
    return;
  }
  res.status(401).json({
    error: "No active session",
    user: req.session.user,
    cookie: req.session.cookie,
  });

  return;
};

export const logoutRoute = (req: Request, res: Response): void => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).json({
          error: "Failed to log out. Please try again.",
        });
        return;
      }

      res.status(200).json({
        message: "User logged out successfully",
      });
    });
  } else {
    res.status(400).json({
      error: "No active session to log out",
    });
  }
};
