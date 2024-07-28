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
