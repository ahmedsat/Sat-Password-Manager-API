const express = require("express");
const router = express.Router();

const {
  addPassword,
  getPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
} = require("../controllers/passwords");

router.route("/").post(addPassword).get(getAllPasswords);
router
  .route("/:id")
  .get(getPassword)
  .patch(updatePassword)
  .delete(deletePassword);

module.exports = router;
