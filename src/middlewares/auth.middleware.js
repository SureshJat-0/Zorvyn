import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";

const authCheck = async (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) return errorResponse(res, "Unauthorized.", null, 401);
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUser.id).select("-password");
    if (!user) return errorResponse(res, "User not found.", null, 404);
    if (user.status !== "active")
      return errorResponse(res, "User account is inactive", null, 403);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return errorResponse(res, "Access token expired.", null, 401);
    return errorResponse(res, "Invalid token", null, 403);
  }
};

export { authCheck };
