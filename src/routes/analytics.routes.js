import express from "express";
import {
  getCategoryBreakdown,
  getSummary,
  getTrends,
} from "../controllers/analytic.controller.js";
import {
  isAllRoles,
  isAnalystOrAdmin,
} from "../middlewares/role.middleware.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const analyticRouter = express.Router();

analyticRouter
  .route("/summary")
  .get(authCheck, isAllRoles, asyncWrapper(getSummary));
analyticRouter
  .route("/categories")
  .get(authCheck, isAnalystOrAdmin, asyncWrapper(getCategoryBreakdown));
analyticRouter
  .route("/trends")
  .get(authCheck, isAnalystOrAdmin, asyncWrapper(getTrends));

export default analyticRouter;
