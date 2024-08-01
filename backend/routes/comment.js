const router = require("express").Router();

const {
  submitComment,
  getCommentsByPostId,
  likeComment,
  toggleLikeComment,
  deleteComment,
} = require("../controllers/comments");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/postComment", isAuthenticated, submitComment);

router.get("/getPostComments/:post_id", getCommentsByPostId);

router.post("/like", isAuthenticated, toggleLikeComment);

router.delete("/deleteComment", isAuthenticated, deleteComment);

module.exports = router;
