import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.js";

const authCheck = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) return errorResponse(res, "Unauthorised", null, 401);
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedUser;
  next();
};

export { authCheck };
