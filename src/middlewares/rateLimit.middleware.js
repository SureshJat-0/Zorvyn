import rateLimit from "express-rate-limit";
import { errorResponse } from "../utils/apiResponse.js";

const ONE_MINUTE_IN_MS = 60 * 1000;

const createLimiter = ({
  max = 10,
  message = "Too many requests. Please try again later.",
}) =>
  rateLimit({
    windowMs: ONE_MINUTE_IN_MS,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      return errorResponse(res, message, null, 429);
    },
  });

const authLimiter = createLimiter({
  max: 10,
  message: "Too many login attempts. Try again later.",
});

const analyticRouteLimiter = createLimiter({
  max: 20,
  message: "Too many analytics requests. Please try again in a minute.",
});

const userRouteLimiter = createLimiter({
  max: 30,
  message: "Too many user requests. Please try again in a minute.",
});

const transactionRouteLimiter = createLimiter({
  max: 25,
  message: "Too many transaction requests. Please try again in a minute.",
});

export {
  authLimiter,
  analyticRouteLimiter,
  userRouteLimiter,
  transactionRouteLimiter,
};
