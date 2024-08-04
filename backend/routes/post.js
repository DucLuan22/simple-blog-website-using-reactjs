const router = require("express").Router();
const passport = require("passport");

const dotenv = require("dotenv");
const path = require("path");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  uploadPost,
  getPosts,
  getPostById,
  getPostByIdAndUpdateViewCount,
  submitComment,
  getPostsByCategoryId,
} = require("../controllers/post");

router.post("/upload", isAuthenticated, uploadPost);

router.get("/getPost", getPosts);

router.get("/:post_id", getPostById);

router.post("/updateViewCount/:post_id", getPostByIdAndUpdateViewCount);

router.get("/category/:category_id", getPostsByCategoryId);

module.exports = router;
