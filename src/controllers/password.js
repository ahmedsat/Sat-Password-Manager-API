const Password = require("../models/Password");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const addPassword = async (req, res) => {
  const {
    user: { _id: userId },
    body: { name, url, username, password: userPassword },
  } = req;

  if (!name || !username || !userPassword) {
    throw new BadRequestError("Missing required fields");
  }
  const password = await Password.create({
    userId,
    name,
    url,
    username,
    password: userPassword,
  });
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

const updatePassword = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: passwordId },
    body: { name, url, username, password },
  } = req;

  res.send("Update Password");
};

const deletePassword = async (req, res) => {
  res.send("Delete Password");
};

module.exports = {
  addPassword,
  getPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
};
