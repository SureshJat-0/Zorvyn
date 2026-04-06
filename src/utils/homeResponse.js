import { successResponse } from "./apiResponse.js";

const homeResponse = (req, res) => {
  return successResponse(res, "Server is running.", { success: true }, 200);
};

export default homeResponse;
