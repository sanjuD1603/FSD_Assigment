import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
session;
import dotenv from "dotenv";
dotenv.config();

const MongoDBStore = MongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "defaultSecret",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: process.env.NODE_ENV === "production",
    secure: false,
    maxAge: 1000 * 60 * 60,
    sameSite:  "None",
    domain: "vercel.app"
  },
});

export default sessionMiddleware;
