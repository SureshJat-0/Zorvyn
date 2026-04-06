import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import userRouter from "./routes/user.routes.js";
import analyticRouter from "./routes/analytics.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import homeResponse from "./utils/homeResponse.js";
import {
  analyticRouteLimiter,
  transactionRouteLimiter,
  userRouteLimiter,
} from "./middlewares/rateLimit.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", homeResponse);

app.use("/api/v1/auth", authRouter); // authLimite is inside auth router
app.use("/api/v1/users", userRouteLimiter, userRouter);
app.use("/api/v1/transactions", transactionRouteLimiter, transactionRouter);
app.use("/api/v1/analytics", analyticRouteLimiter, analyticRouter);

app.use(errorHandler);
app.use(notFound);

export default app;
