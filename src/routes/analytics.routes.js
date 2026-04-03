import express from "express";
import {
  getCategoryBreakdown,
  getSummary,
  getTrends,
} from "../controllers/analytic.controller.js";

const analyticRouter = express.Router();

analyticRouter.route("/summary").get(getSummary);
analyticRouter.route("/categories").get(getCategoryBreakdown);
analyticRouter.route("/trends").get(getTrends);

export default analyticRouter;
