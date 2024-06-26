const router = require("express").Router();
const passport = require("passport");

const dotenv = require("dotenv");
const path = require("path");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { uploadPost, getPosts } = require("../controllers/post");

router.post("/upload", isAuthenticated, uploadPost);

router.get("/getPost", getPosts);
module.exports = router;
