import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { isAllRoles } from "../middlewares/role.middleware.js";
import {
  validateLoginJoi,
  validateRegisterJoi,
} from "../validations/auth.validation.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(authLimiter, validateRegisterJoi, asyncWrapper(registerUser)); // public access
authRouter
  .route("/login")
  .post(authLimiter, validateLoginJoi, asyncWrapper(loginUser)); // public access
authRouter
  .route("/me")
  .get(authCheck, isAllRoles, asyncWrapper(getCurrentUser));

export default authRouter;
