import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  successResponse(res, "All users fetched", users, 200);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  successResponse(res, `User fetched with id ${id}`, user, 200);
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  console.log(role);
  const result = await User.updateOne(
    { _id: id },
    {
      $set: { role: role },
    },
  );
  if (!result) return errorResponse(res, "User not found", null, 400);
  successResponse(res, "User role updated", { id, role }, 200);
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await User.updateOne(
    { _id: id },
    {
      $set: { status: status },
    },
  );
  if (!result) return errorResponse(res, "User not found", null, 400);
  successResponse(res, "User status updated", { id, status }, 200);
};

const deleteuser = async (req, res) => {
  const { id } = req.params;
  await User.deleteOne({ _id: id });
  successResponse(res, `User deleted with id ${id}`, { id }, 200);
};

export { getUsers, getUserById, updateUserRole, updateUserStatus, deleteuser };
