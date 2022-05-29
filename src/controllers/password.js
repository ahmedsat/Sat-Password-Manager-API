const { StatusCodes } = require("http-status-codes");
const Password = require("../models/Password");
const { NotFoundError, BadRequestError } = require("../errors");
const crypto = require("../security/crypto");

const addPassword = async (req, res) => {
  const {
    user: { _id: userId },
    body: { name, url, username, password: userPassword },
  } = req;

  if (!name || !username || !userPassword) {
    throw new BadRequestError("Missing required fields");
  }
  const encryptedPassword = crypto.encryptPassword(userPassword);
  const password = await Password.create({
    userId,
    name,
    url,
    username,
    password: encryptedPassword,
  });
  res.status(StatusCodes.CREATED).json(password);
};

const getPassword = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: passwordId },
  } = req;

  const password = await Password.findOne({ userId, _id: passwordId });
  if (!password) {
    throw new NotFoundError("Password not found");
  }
  password.password = crypto.decryptPassword(password.password);
  res.status(StatusCodes.OK).json(password);
};

const getAllPasswords = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const passwords = await Password.find({ userId });
  passwords.forEach((password) => {
    password.password = crypto.decryptPassword(password.password);
  });
  res.status(StatusCodes.OK).json({ size: passwords.length, passwords });
};

const updatePassword = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: passwordId },
    body: { name, url, username, password: userPassword },
  } = req;
  if (!name || !username || !userPassword) {
    throw new BadRequestError("Missing required fields");
  }
  const encryptedPassword = crypto.encryptPassword(userPassword);
  const password = await Password.findOneAndUpdate(
    { userId, _id: passwordId },
    { name, url, username, password: encryptedPassword },
    { new: true, runValidators: true }
  );
  if (!password) {
    throw new NotFoundError("Password not found");
  }
  res.status(StatusCodes.OK).json(password);
};

const deletePassword = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: passwordId },
  } = req;
  const password = await Password.findOneAndDelete({ userId, _id: passwordId });
  if (!password) {
    throw new NotFoundError("Password not found");
  }
  password.password = crypto.decryptPassword(password.password);
  res.status(StatusCodes.OK).json(password);
};

module.exports = {
  addPassword,
  getPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
};
