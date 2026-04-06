import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists. Skipping user seeding.");
    return existingAdmin;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  const users = await User.insertMany([
    {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
    },
    {
      name: "Analyst User",
      email: "analyst@example.com",
      password: hashedPassword,
      role: "analyst",
      status: "active",
    },
    {
      name: "Viewer User",
      email: "viewer@example.com",
      password: hashedPassword,
      role: "viewer",
      status: "active",
    },
  ]);

  console.log("Users seeded");
  return users[0]; // return admin
};

const seedTransactions = async (adminUser) => {
  const existing = await Transaction.countDocuments();

  if (existing > 0) {
    console.log("Transactions already exist. Skipping.");
    return;
  }

  const transactions = [
    {
      amount: 50000,
      type: "income",
      category: "Salary",
      date: new Date(),
      description: "Monthly salary",
    },
    {
      amount: 2000,
      type: "expense",
      category: "Bills",
      date: new Date(),
      description: "Weekly bills",
    },
    {
      amount: 1500,
      type: "expense",
      category: "Travel",
      date: new Date(),
      description: "Bus tickets",
    },
    {
      amount: 10000,
      type: "income",
      category: "Shopping",
      date: new Date(),
      description: "Side project shopping",
    },
  ];

  await Transaction.insertMany(transactions);
  console.log("Transactions seeded");
};

const initData = async () => {
  await connectDB();

  const adminUser = await seedUsers();
  await seedTransactions(adminUser);

  console.log("Seeding complete");
  process.exit();
};

initData();
