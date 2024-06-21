const router = require("express").Router();
const passport = require("passport");

const dotenv = require("dotenv");
const path = require("path");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { uploadPost } = require("../controllers/post");

router.post("/upload", uploadPost);

module.exports = router;
