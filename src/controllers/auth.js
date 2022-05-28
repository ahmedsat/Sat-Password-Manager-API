const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const res = require("express/lib/response");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  token = user.CreatJWT();
  res
    .header("x-auth-token", token)
    .status(StatusCodes.CREATED)
    .json({ name: user.name, id: user._id, token: token });
};

const login = (req, res) => {
  res.json({ message: "Login", data: req.body });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports = {
  login,
  register,
  deleteUser,
  getAllUsers,
};
