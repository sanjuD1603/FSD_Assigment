import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.session && req.session.user && req.session.user.id) {
    // console.log("Session " + req.session.user);
   return next();
  }
  res.status(401).json({ message: "Unauthorized access" });
};
