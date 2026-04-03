import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const registerUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email || !role || !password) {
    return errorResponse(res, "All fields are required!", null, 400);
  }
  const user = await User.findOne({ email });
  if (user)
    return errorResponse(res, "User with this email already exist.", null, 400);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, role, password: hashedPassword };
  const registeredUser = await User.insertOne(newUser);
  successResponse(res, "User registered successfully", registeredUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return errorResponse(
      res,
      "User with this email does not exist.",
      null,
      400,
    );
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return errorResponse(res, "Invalid credentials", null, 400);
  // JWT Auth
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  successResponse(res, "Login successful", { email: user.email });
};

const getCurrentUser = async (req, res) => {
  const id = req.user.id;
  if (!id) return errorResponse(res, "Unauthorized", null, 400);
  const user = await User.findById(id).select("-password");
  successResponse(res, "User fetched", user, 200);
};

export { registerUser, loginUser, getCurrentUser };
