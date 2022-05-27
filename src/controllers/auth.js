const login = (req, res) => {
  res.send("Login");
};

const register = (req, res) => {
  res.send("Register");
};

module.exports = {
  login,
  register,
};
