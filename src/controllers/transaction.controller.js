import Transaction from "../models/transaction.model.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const createTransaction = async (req, res) => {
  const { amount, type, category, date, description } = req.body;
  const CATEGORIES = ["Food", "Travel", "Shopping", "Salary", "Bills"];
  if (!amount || !type || !category || !date || !description)
    return errorResponse(res, "All fields are required.", null, 400);
  const newTransaction = {
    amount,
    type,
    category: CATEGORIES.includes(category) ? category : "Other",
    date,
    description,
  };
  const result = await Transaction.insertOne(newTransaction);
  successResponse(
    res,
    "Transaction created successfully.",
    { id: result._id },
    201,
  );
};

const getTransactions = async (req, res) => {
  let { type, category, page, limit, sortBy, order } = req.query;

  const dbQuery = {};
  if (type) dbQuery.type = type;
  if (category) dbQuery.category = category;

  const allowedSortFields = [
    "date",
    "amount",
    "category",
    "type",
    "createdAt",
    "updatedAt",
  ];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "date";
  const sortOrder = order === "asc" ? 1 : -1;

  const shouldPaginate = page !== undefined || limit !== undefined;
  let pageNumber = 1;
  let limitNumber = 10;

  if (shouldPaginate) {
    pageNumber = Math.max(1, parseInt(page, 10) || 1);
    limitNumber = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  }

  let query = Transaction.find(dbQuery).sort({ [sortField]: sortOrder });
  if (shouldPaginate) {
    query = query.skip((pageNumber - 1) * limitNumber).limit(limitNumber);
  }

  const transactions = await query;
  successResponse(res, "Transactions fetched successfully.", transactions, 200);
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  if (!transaction)
    return errorResponse(res, `Transaction not found. id: ${id}`, null, 404);
  successResponse(
    res,
    `Transaction fetched successfully for id: ${id}.`,
    transaction,
    200,
  );
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.deleteOne({ _id: id });
  if (result.deletedCount === 0)
    return errorResponse(res, `Transaction not found. id : ${id}`, null, 404);
  successResponse(
    res,
    `Transaction deleted successfully for id: ${id}.`,
    { deletedId: id },
    200,
  );
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true },
  );
  if (!updatedTransaction)
    return errorResponse(res, "Transaction not found.", null, 404);
  successResponse(
    res,
    "Transaction updated successfully.",
    { id: updatedTransaction._id },
    200,
  );
};

const getRecentTransactions = async (req, res) => {
  const recentTransactions = await Transaction.find({}).limit(5);
  successResponse(
    res,
    "Recent transactions fetched successfully.",
    recentTransactions,
    200,
  );
};

export {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
  updateTransaction,
  getRecentTransactions,
};
