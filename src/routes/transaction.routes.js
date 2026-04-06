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
import {
  isAdmin,
  isAnalystOrAdmin,
  isAllRoles,
} from "../middlewares/role.middleware.js";
import {
  validateTransactionJoi,
  validateTransactionUpdateJoi,
} from "../validations/transaction.validation.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const transactionRouter = express.Router();

transactionRouter
  .route("/")
  .post(
    authCheck,
    isAdmin,
    validateTransactionJoi,
    asyncWrapper(createTransaction),
  )
  .get(authCheck, isAnalystOrAdmin, asyncWrapper(getTransactions));
transactionRouter
  .route("/recent")
  .get(authCheck, isAllRoles, asyncWrapper(getRecentTransactions));
transactionRouter
  .route("/:id")
  .get(authCheck, isAnalystOrAdmin, asyncWrapper(getTransactionById))
  .delete(authCheck, isAdmin, asyncWrapper(deleteTransaction))
  .patch(
    authCheck,
    isAdmin,
    validateTransactionUpdateJoi,
    asyncWrapper(updateTransaction),
  );

export default transactionRouter;
