import { errorResponse } from "../utils/apiResponse.js";

const isAdmin = (req, res, next) => {
  if (!req.user) return errorResponse(res, "Unauthorized.", null, 401);
  if (req.user.role !== "admin") {
    return errorResponse(res, "Forbidden: admin access only.", {}, 403);
  }
  next();
};

const isAnalystOrAdmin = (req, res, next) => {
  if (!req.user) return errorResponse(res, "Unauthorized.", null, 401);
  if (req.user.role === "analyst" || req.user.role === "admin") {
    return next();
  }
  return errorResponse(
    res,
    "Forbidden: analyst or admin access required.",
    {},
    403,
  );
};

const isAllRoles = (req, res, next) => {
  if (!req.user) return errorResponse(res, "Unauthorized.", null, 401);
  if (
    req.user.role === "viewer" ||
    req.user.role === "analyst" ||
    req.user.role === "admin"
  )
    return next();
  return errorResponse(res, "Forbidden: role access denied.", {}, 403);
};

export { isAdmin, isAnalystOrAdmin, isAllRoles };
