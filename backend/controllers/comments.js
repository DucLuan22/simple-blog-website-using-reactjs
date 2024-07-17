const connection = require("../db");

exports.submitComment = async (req, res, next) => {
  const { user_id, post_id, content } = req.body;

  const query =
    "INSERT INTO `comments` (`user_id`, `post_id`, `content`) VALUES (?, ?, ?)";
  const values = [user_id, post_id, content];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Comment submitted successfully",
      data: {
        user_id,
        post_id,
        content,
      },
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
      return res.status(404).json({
        success: false,
        message: "No comments found for this post",
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};
