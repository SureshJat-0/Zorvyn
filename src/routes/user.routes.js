import express from "express";
import {
  deleteuser,
  getUserById,
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middlewares.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter
  .route("/:id")
  .get(getUserById)
  .delete(authCheck, adminOnly, deleteuser);
userRouter.route("/:id/role").patch(authCheck, adminOnly, updateUserRole);
userRouter.route("/:id/status").patch(authCheck, adminOnly, updateUserStatus);

export default userRouter;
