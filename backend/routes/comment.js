const router = require("express").Router();

const {
  submitComment,
  getCommentsByPostId,
  likeComment,
  toggleLikeComment,
} = require("../controllers/comments");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/postComment", isAuthenticated, submitComment);

router.get("/getPostComments/:post_id", getCommentsByPostId);

router.post("/like", isAuthenticated, toggleLikeComment);

module.exports = router;
