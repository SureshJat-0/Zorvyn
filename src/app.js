import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import { authCheck } from "./middlewares/auth.middleware.js";
import authRouter from "./routes/auth.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import userRouter from "./routes/user.routes.js";
import analyticRouter from "./routes/analytics.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", authCheck, (req, res) => {
  res.json({ success: true });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/analytics", analyticRouter);

app.use(errorHandler);
app.use(notFound);

export default app;
