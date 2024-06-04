const express = require("express");
const { validateUser, isLoggedIn } = require("../middleware/index");
const { signUp, login, logout, getUser } = require("../controllers/user.js");
const catchAsync = require("../utils/catchAsync.js");

const router = express.Router();
// route to get user info for authenticated apis
router.get("/", isLoggedIn, catchAsync(getUser));
// route for Logout
router.get("/logout", catchAsync(logout));
// route for Sign up
router.post("/sign-up", validateUser, catchAsync(signUp));
// route for Login
router.post("/login", catchAsync(login));

module.exports = router;
