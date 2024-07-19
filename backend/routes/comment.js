const router = require("express").Router();

const {
  submitComment,
  getCommentsByPostId,
  likeComment,
} = require("../controllers/comments");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/postComment/:post_id", isAuthenticated, submitComment);

router.get("/getPostComments/:post_id", getCommentsByPostId);

router.get("/likeComment", isAuthenticated, likeComment);

module.exports = router;
