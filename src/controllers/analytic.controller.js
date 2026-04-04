import Transaction from "../models/transaction.model.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const CATEGORIES = ["Food", "Travel", "Shopping", "Salary", "Bills", "Other"];

const buildCategoryBucket = () => {
  const bucket = {};
  CATEGORIES.forEach((category) => {
    bucket[category] = 0;
  });
  return bucket;
};

const getSummary = async (req, res) => {
  const transactions = await Transaction.find({}, "amount type").lean();
  const summary = transactions.reduce(
    (acc, transaction) => {
      const amount = Number(transaction.amount) || 0;
      if (transaction.type === "income") {
        acc.totalIncome += amount;
        acc.incomeCount += 1;
      } else if (transaction.type === "expense") {
        acc.totalExpense += amount;
        acc.expenseCount += 1;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0, incomeCount: 0, expenseCount: 0 },
  );
  const result = {
    totalIncome: summary.totalIncome,
    totalExpense: summary.totalExpense,
    netBalance: summary.totalIncome - summary.totalExpense,
    totalTransactions: transactions.length,
    totalExpenseTransactions: summary.expenseCount,
    totalIncomeTransactions: summary.incomeCount,
    averageExpense:
      summary.expenseCount > 0
        ? summary.totalExpense / summary.expenseCount
        : 0,
    averageIncome:
      summary.incomeCount > 0 ? summary.totalIncome / summary.incomeCount : 0,
  };
  successResponse(res, "Analytics summary fetched successfully.", result, 200);
};

const getCategoryBreakdown = async (req, res) => {
  const transactions = await Transaction.find(
    {},
    "amount type category",
  ).lean();
  const result = {
    income: buildCategoryBucket(),
    expense: buildCategoryBucket(),
  };

  transactions.forEach((transaction) => {
    const typeKey = transaction.type === "income" ? "income" : "expense";
    const category = CATEGORIES.includes(transaction.category)
      ? transaction.category
      : "Other";
    result[typeKey][category] += Number(transaction.amount) || 0;
  });

  successResponse(res, "Category breakdown fetched successfully.", result, 200);
};

const getTrends = async (req, res) => {
  const transactions = await Transaction.find({}, "amount type date")
    .sort({ date: 1 })
    .lean();
  const trends = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    if (Number.isNaN(date.getTime())) {
      return;
    }
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    if (!trends[year]) {
      trends[year] = {};
    }
    if (!trends[year][month]) {
      trends[year][month] = { income: 0, expense: 0 };
    }
    const typeKey = transaction.type === "income" ? "income" : "expense";
    trends[year][month][typeKey] += Number(transaction.amount) || 0;
  });

  successResponse(res, "Trends fetched successfully.", trends, 200);
};

export { getSummary, getCategoryBreakdown, getTrends };
