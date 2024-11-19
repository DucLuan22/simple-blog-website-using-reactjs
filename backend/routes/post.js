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
  deletePost,
  updatePost,
  getPostByUserId,
  getMonthlyViews,
  getYearlyViews,
  getTodayStatsByUserId,
  getViews,
  getTopDailyViewedPosts,

  editPostById,
  getPostStatsWithCommentsByUserId,
  getPostStatsByUserId,
  createShare,
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

router.post("/delete", isAuthenticated, deletePost);

router.post("/update", isAuthenticated, updatePost);

router.get("/users/:user_id", isAuthenticated, getPostByUserId);

router.get("/stats/monthly-view/:user_id", isAuthenticated, getMonthlyViews);

router.get("/stats/yearly-view/:user_id", isAuthenticated, getYearlyViews);

router.get(
  "/stats/daily-notification/:user_id",
  isAuthenticated,
  getTodayStatsByUserId
);

router.get(
  "/stats/get-posts-stats/:user_id",
  isAuthenticated,
  getPostStatsByUserId
);

router.get("/stats/get-views/:user_id", isAuthenticated, getViews);

router.get("/stats/top-daily-posts", getTopDailyViewedPosts);

router.put("/edit-post/:post_id", isAuthenticated, editPostById);

router.post("/shares/create-share", createShare);

module.exports = router;
