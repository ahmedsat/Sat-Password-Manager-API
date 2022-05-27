const addPassword = (req, res) => {
  res.send("Add Password");
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
