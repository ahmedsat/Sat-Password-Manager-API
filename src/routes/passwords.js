const express = require("express");
const router = express.Router();

const {
  addPassword,
  getPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
} = require("../controllers/passwords");
const { auth } = require("../middlewares");

router.route("/").post(auth, addPassword).get(getAllPasswords);
router
  .route("/:id")
  .get(getPassword)
  .patch(updatePassword)
  .delete(deletePassword);

module.exports = router;
