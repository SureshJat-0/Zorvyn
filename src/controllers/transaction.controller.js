import Transaction from "../models/transaction.model.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const createTransaction = async (req, res) => {
  const { amount, type, category, date, description } = req.body;
  if (!amount || !type || !category || !date || !description)
    return errorResponse(res, "All fields are required", null, 400);
  const newTransaction = {
    amount,
    type,
    category,
    date,
    description,
  };
  const result = await Transaction.insertOne(newTransaction);
  console.log("Transaction created");
  successResponse(res, "Transaction created", { id: result._id }, 201);
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({});
  successResponse(res, "All transactions", transactions, 200);
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  successResponse(res, `Transaction with id : ${id}`, transaction, 200);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.deleteOne({ _id: id });
  successResponse(
    res,
    `Transaction deleted with id : ${id}`,
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
    return errorResponse(res, "Transaction not found", null, 400);
  successResponse(
    res,
    "Transaction updated",
    { id: updatedTransaction._id },
    200,
  );
};

const getRecentTransactions = async (req, res) => {
  const recentTransactions = await Transaction.find({}).limit(5);
  successResponse(res, "Resend transactions", recentTransactions, 200);
};

export {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
  updateTransaction,
  getRecentTransactions,
};
