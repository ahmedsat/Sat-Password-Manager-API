const express = require("express");
const router = express.Router();

const {
  login,
  register,
  deleteUser,
  getAllUsers,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);

// //? this routes are only for admin we can add middleware for admin only
// router.get("/", getAllUsers);
// router.delete("/:id", deleteUser);
// disable admin routes for now

module.exports = router;
