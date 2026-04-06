import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      default: "expense",
      required: true,
    },
    category: {
      type: String,
      default: "Other",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
