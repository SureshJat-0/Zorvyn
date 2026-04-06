import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return errorResponse(res, "All fields are required.", null, 400);
  }
  const user = await User.findOne({ email });
  if (user)
    return errorResponse(
      res,
      "A user with this email already exists.",
      null,
      409,
    );
  const adminCount = await User.countDocuments({ role: "admin" });
  let role = "viewer";
  if (adminCount === 0) role = "admin"; // role for first registration will be admin
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    role,
    password: hashedPassword,
    status: "active",
  };
  const registeredUser = await User.insertOne(newUser);
  successResponse(res, "User registered successfully.", registeredUser, 201);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return errorResponse(res, "User not found with this email.", null, 404);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return errorResponse(res, "Invalid email or password.", null, 401);
  if (user.status !== "active")
    return errorResponse(res, "User account is inactive.", null, 403);
  // JWT Auth
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  successResponse(res, "Login successful.", { email: user.email }, 200);
};

const getCurrentUser = async (req, res) => {
  const id = req.user.id;
  if (!id) return errorResponse(res, "Unauthorized.", null, 401);
  const user = await User.findById(id).select("-password");
  successResponse(res, "Current user fetched successfully.", user, 200);
};

export { registerUser, loginUser, getCurrentUser };
