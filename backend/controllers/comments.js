const connection = require("../db");

exports.submitComment = async (req, res, next) => {
  const { user_id, post_id, content } = req.body;

  const insertQuery =
    "INSERT INTO `comments` (`user_id`, `post_id`, `content`) VALUES (?, ?, ?)";
  const insertValues = [user_id, post_id, content];

  connection.query(insertQuery, insertValues, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    const commentId = results.insertId;

    const selectQuery =
      "SELECT `comment_id`, `user_id`, `post_id`, `content`, `createdAt`, `likes` FROM `comments` WHERE `comment_id` = ?";
    connection.query(selectQuery, [commentId], (err, results, fields) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }

      // Send success response with the new comment data
      return res.status(201).json({
        success: true,
        message: "Comment submitted successfully",
        data: results[0],
      });
    });
  });
};

exports.getCommentsByPostId = async (req, res, next) => {
  const { post_id } = req.params;

  const query = `
    SELECT comments.*, users.familyName, users.givenName 
    FROM comments 
    JOIN users ON comments.user_id = users.id 
    WHERE comments.post_id = ?
  `;

  connection.query(query, [post_id], (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    if (results.length === 0) {
      return res.status(200).json({
        success: true,
        data: results,
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};

exports.toggleLikeComment = async (req, res, next) => {
  const { user_id, comment_id } = req.body;

  const checkLikeQuery =
    "SELECT * FROM comment_likes WHERE user_id = ? AND comment_id = ?";
  const insertLikeQuery =
    "INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)";
  const deleteLikeQuery =
    "DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?";
  const incrementLikesQuery =
    "UPDATE comments SET likes = likes + 1 WHERE comment_id = ?";
  const decrementLikesQuery =
    "UPDATE comments SET likes = likes - 1 WHERE comment_id = ?";

  connection.query(checkLikeQuery, [user_id, comment_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (results.length === 0) {
      // User has not liked the comment yet, so like it
      connection.query(
        insertLikeQuery,
        [user_id, comment_id],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          connection.query(
            incrementLikesQuery,
            [comment_id],
            (err, results) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }

              return res.status(200).json({
                success: true,
                message: "Comment liked successfully",
              });
            }
          );
        }
      );
    } else {
      // User has already liked the comment, so unlike it
      connection.query(
        deleteLikeQuery,
        [user_id, comment_id],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          connection.query(
            decrementLikesQuery,
            [comment_id],
            (err, results) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }

              return res.status(200).json({
                success: true,
                message: "Removed like",
              });
            }
          );
        }
      );
    }
  });
};

exports.toggleDislikeComment = async (req, res, next) => {
  const { user_id, comment_id } = req.body;

  const checkDislikeQuery =
    "SELECT * FROM comment_dislikes WHERE user_id = ? AND comment_id = ?";
  const insertDislikeQuery =
    "INSERT INTO comment_dislikes (user_id, comment_id) VALUES (?, ?)";
  const deleteDislikeQuery =
    "DELETE FROM comment_dislikes WHERE user_id = ? AND comment_id = ?";
  const incrementDislikesQuery =
    "UPDATE comments SET dislikes = dislikes + 1 WHERE comment_id = ?";
  const decrementDislikesQuery =
    "UPDATE comments SET dislikes = dislikes - 1 WHERE comment_id = ?";

  connection.query(checkDislikeQuery, [user_id, comment_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (results.length === 0) {
      // User has not disliked the comment yet, so dislike it
      connection.query(
        insertDislikeQuery,
        [user_id, comment_id],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          connection.query(
            incrementDislikesQuery,
            [comment_id],
            (err, results) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }

              return res.status(200).json({
                success: true,
                message: "Comment disliked successfully",
              });
            }
          );
        }
      );
    } else {
      // User has already disliked the comment, so remove dislike
      connection.query(
        deleteDislikeQuery,
        [user_id, comment_id],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          }

          connection.query(
            decrementDislikesQuery,
            [comment_id],
            (err, results) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              }

              return res.status(200).json({
                success: true,
                message: "Removed dislike",
              });
            }
          );
        }
      );
    }
  });
};

exports.deleteComment = async (req, res, next) => {
  const { comment_id, user_id } = req.body;

  const deleteLikesQuery =
    "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?";
  const deleteCommentQuery =
    "DELETE FROM comments WHERE comment_id = ? AND user_id = ?";

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    // First, delete all likes associated with the comment
    connection.query(
      deleteLikesQuery,
      [comment_id, user_id],
      (err, results) => {
        if (err) {
          return connection.rollback(() => {
            return res.status(500).json({
              success: false,
              error: err.message,
            });
          });
        }

        // Then, delete the comment itself
        connection.query(
          deleteCommentQuery,
          [comment_id, user_id],
          (err, results) => {
            if (err) {
              return connection.rollback(() => {
                return res.status(500).json({
                  success: false,
                  error: err.message,
                });
              });
            }

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  return res.status(500).json({
                    success: false,
                    error: err.message,
                  });
                });
              }

              return res.status(200).json({
                success: true,
                message: "Comment deleted successfully",
              });
            });
          }
        );
      }
    );
  });
};
