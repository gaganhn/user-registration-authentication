import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import cors from "cors";

// Route Handler Imports
import { signInRouter } from "./routes/sign-in";
import { signUpRouter } from "./routes/sign-up";

// Error Handler Imports
import { globalErrorHandler, NotFoundError } from "@raw-ticket/common";

// Env config
import dotenv from "dotenv";
dotenv.config();

const app = express();

// app.set("trust proxy", true);
app.use(express.json({ limit: "10kb" }));
app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

app.use(
  cors({
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(signInRouter);
app.use(signUpRouter);

// Error Handling Middleware
app.use(globalErrorHandler);

// Not Found routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Database connection and server startup code
const start = async () => {
  let dbConnectionStr;
  if (!process.env.JWT_KEY) throw new Error("JWT key must be defined");

  if (!process.env.MONGODB_CONNECTION_STRING) {
    dbConnectionStr = "mongodb://localhost:27017/auth";
  } else {
    dbConnectionStr = process.env.MONGODB_CONNECTION_STRING;
  }

  try {
    await mongoose.connect(dbConnectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (e) {
    console.error(e);
  }

  app.listen(process.env.PORT, () => {
    console.log("Listening on port ", process.env.PORT);
  });
};

start();
