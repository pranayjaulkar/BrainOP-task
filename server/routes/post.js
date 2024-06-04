const express = require("express");
const { isLoggedIn } = require("../middleware/index");
const catchAsync = require("../utils/catchAsync.js");
const { getPosts, createPosts } = require("../controllers/post.js");

const router = express.Router();
// route to get posts for authenticated apis
router.get("/", isLoggedIn, catchAsync(getPosts));

module.exports = router;
