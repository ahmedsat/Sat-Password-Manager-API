const User = require("../models/User");

const login = (req, res) => {
  res.json({ message: "Login", data: req.body });
};

const register = (req, res) => {
  res.json({ message: "Register", data: req.body });
};

module.exports = {
  login,
  register,
};
