import { errorResponse } from "../utils/apiResponse.js";

const checkUserInRequest = (req, res) => {
  return req.user ? true : false;
};

const adminOnly = (req, res, next) => {
  if (!checkUserInRequest(req, res))
    return errorResponse(res, "Unauthorised", null, 401);

  if (req.user.role !== "admin") {
    return errorResponse(res, "Unauthorised: Admin only", {}, 401);
  }

  next();
};

const analyticAccess = (req, res, next) => {
  if (!checkUserInRequest(req, res))
    return errorResponse(res, "Unauthorised", null, 401);

  if (req.user.role === "analytic" || req.user.role === "admin") {
    return next();
  }

  return errorResponse(res, "Unauthorised: Analytic route", {}, 401);
};

export { adminOnly, analyticAccess };
