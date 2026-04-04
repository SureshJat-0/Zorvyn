import express from "express";
import {
  deleteuser,
  getUserById,
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const userRouter = express.Router();

userRouter.route("/").get(authCheck, isAdmin, getUsers);
userRouter
  .route("/:id")
  .get(authCheck, isAdmin, asyncWrapper(getUserById))
  .delete(authCheck, isAdmin, asyncWrapper(deleteuser));
userRouter
  .route("/:id/role")
  .patch(authCheck, isAdmin, asyncWrapper(updateUserRole));
userRouter
  .route("/:id/status")
  .patch(authCheck, isAdmin, asyncWrapper(updateUserStatus));

export default userRouter;
