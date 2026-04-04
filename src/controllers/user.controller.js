import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  successResponse(res, "Users fetched successfully.", users, 200);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return errorResponse(res, "User not found.", null, 404);
  successResponse(res, `User fetched successfully for id: ${id}.`, user, 200);
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!role) return errorResponse(res, "Role not found.", null, 404);
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: { role: role },
    },
    { new: true, runValidators: true },
  );
  if (!result) return errorResponse(res, "User not found.", null, 404);
  successResponse(res, "User role updated successfully.", { id, role }, 200);
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return errorResponse(res, "Status not found.", null, 404);
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: { status: status },
    },
    { new: true, runValidators: true },
  );
  if (!result) return errorResponse(res, "User not found.", null, 404);
  successResponse(
    res,
    "User status updated successfully.",
    { id, status },
    200,
  );
};

const deleteuser = async (req, res) => {
  const { id } = req.params;
  const result = await User.deleteOne({ _id: id });
  console.log(result);
  if (result.deletedCount === 0)
    return errorResponse(res, `User not found. id: ${id}`, null, 404);
  successResponse(res, `User deleted successfully for id: ${id}.`, { id }, 200);
};

export { getUsers, getUserById, updateUserRole, updateUserStatus, deleteuser };
