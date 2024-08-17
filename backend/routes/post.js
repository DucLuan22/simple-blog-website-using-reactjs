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
const {
  toggleBookmark,
  getBookmarksByUserId,
  deleteBookmark,
} = require("../controllers/bookmark");

router.post("/upload", isAuthenticated, uploadPost);

router.get("/getPost", getPosts);

router.get("/:post_id", getPostById);

router.post("/updateViewCount/:post_id", getPostByIdAndUpdateViewCount);

router.get("/category/:category_id", getPostsByCategoryId);

router.post("/bookmark", isAuthenticated, toggleBookmark);

router.get("/bookmark/:user_id", isAuthenticated, getBookmarksByUserId);

router.post("/bookmark/delete", isAuthenticated, deleteBookmark);

module.exports = router;
