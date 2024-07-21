const connection = require("../db");

exports.addBookmark = async (req, res, next) => {
  const { user_id, post_id } = req.body;

  const query = "INSERT INTO `bookmarks` (`user_id`, `post_id`) VALUES (?, ?)";
  const values = [user_id, post_id];

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
      message: "Bookmark added successfully",
      data: {
        user_id,
        post_id,
      },
    });
  });
};

exports.getBookmarksByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  const query = `
      SELECT bookmarks.*, posts.title, posts.content 
      FROM bookmarks 
      JOIN posts ON bookmarks.post_id = posts.post_id 
      WHERE bookmarks.user_id = ?
    `;

  connection.query(query, [user_id], (err, results, fields) => {
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

exports.deleteBookmark = async (req, res, next) => {
  const { user_id, post_id } = req.body;

  const query = "DELETE FROM bookmarks WHERE user_id = ? AND post_id = ?";

  connection.query(query, [user_id, post_id], (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Bookmark deleted successfully",
    });
  });
};
