import "express-session"; 

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      name: string;
      username: string;
      isAdminUser:boolean;
    };
  }
}


declare namespace Express {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}