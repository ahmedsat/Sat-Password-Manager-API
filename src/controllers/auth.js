const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  token = user.CreatJWT();
  res

    .status(StatusCodes.CREATED)
    .json({ name: user.name, id: user._id, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid password");
  }

  token = user.CreatJWT();
  res

    .status(StatusCodes.OK)
    .json({ name: user.name, id: user._id, token: token });
};

const me = async (req, res) => {
  // destructuring the user from the request
  const { user } = req;
  res.status(StatusCodes.OK).json({ name: user.name, id: user._id });
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
  me,
  deleteUser,
  getAllUsers,
};
