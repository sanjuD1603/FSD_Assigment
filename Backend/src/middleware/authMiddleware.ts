import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    if (req.session && req.session.user && req.session.user.id) {
      console.log(
        "Session in auth middleware" + JSON.stringify(req.session, null, 2)
      );
      return next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error has occured" });
  }
  res.status(401).json({ message: "Unauthorized access" });
};
