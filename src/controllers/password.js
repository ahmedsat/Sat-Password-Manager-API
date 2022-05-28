const Password = require("../models/Password");
const { StatusCodes } = require("http-status-codes");

const addPassword = async (req, res) => {
  req.body.userId = req.user._id;
  const password = await Password.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(password);
  // res.json({ ...req.body });
};

const getPassword = (req, res) => {
  res.send("Get Password");
};

const getAllPasswords = (req, res) => {
  res.send("Get All Passwords");
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
