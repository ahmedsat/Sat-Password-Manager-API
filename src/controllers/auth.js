const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const res = require("express/lib/response");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = {
    name,
    email,
    password: hashedPassword,
  };
  const user = await User.create(tempUser);
  res.status(StatusCodes.CREATED).json(user);
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
