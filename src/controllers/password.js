const Password = require("../models/Password");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const addPassword = async (req, res) => {
  req.body.userId = req.user._id;
  const password = await Password.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(password);
};

const getPassword = async (req, res) => {
  const userId = req.user._id;
  const passwordId = req.params.id;
  const password = await Password.findOne({ userId, _id: passwordId });
  if (!password) {
    throw new NotFoundError("Password not found");
  }
  res.status(StatusCodes.OK).json(password);
};

const getAllPasswords = async (req, res) => {
  const userId = req.user._id;
  const passwords = await Password.find({ userId });
  res.status(StatusCodes.OK).json({ size: passwords.length, passwords });
};

const updatePassword = (req, res) => {
  res.send("Update Password");
};

const deletePassword = (req, res) => {
  res.send("Delete Password");
};

module.exports = {
  addPassword,
  getPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
};
