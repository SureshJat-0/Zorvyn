import express from "express";
import { getCurrentUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middlewares.js";

const authRouter = express.Router();

authRouter.route("/register").post(authCheck, adminOnly, registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/me").get(authCheck, getCurrentUser);

export default authRouter;
