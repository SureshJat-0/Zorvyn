import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getRecentTransactions,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { adminOnly, analyticAccess } from "../middlewares/role.middlewares.js";

const transactionRouter = express.Router();

transactionRouter
  .route("/")
  .post(authCheck, adminOnly, createTransaction)
  .get(analyticAccess, getTransactions);
transactionRouter.route("/recent").get(getRecentTransactions);
transactionRouter
  .route("/:id")
  .get(getTransactionById)
  .delete(authCheck, adminOnly, deleteTransaction)
  .put(authCheck, adminOnly, updateTransaction);

export default transactionRouter;
