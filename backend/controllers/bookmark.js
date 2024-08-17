const connection = require("../db");

exports.toggleBookmark = async (req, res, next) => {
  const { user_id, post_id } = req.body;

  // Check if the bookmark exists
  const checkQuery =
    "SELECT * FROM bookmarks WHERE user_id = ? AND post_id = ?";
  connection.query(checkQuery, [user_id, post_id], (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    if (results.length > 0) {
      // If bookmark exists, delete it
      const deleteQuery =
        "DELETE FROM bookmarks WHERE user_id = ? AND post_id = ?";
      connection.query(
        deleteQuery,
        [user_id, post_id],
        (err, results, fields) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: err,
            });
          }

          return res.status(200).json({
            success: true,
            message: "Bookmark removed successfully",
          });
        }
      );
    } else {
      // If bookmark doesn't exist, add it
      const addQuery = "INSERT INTO bookmarks (user_id, post_id) VALUES (?, ?)";
      connection.query(addQuery, [user_id, post_id], (err, results, fields) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err,
          });
        }

        return res.status(201).json({
          success: true,
          message: "Bookmark added successfully",
          data: {
            user_id,
            post_id,
          },
        });
      });
    }
  });
};

exports.getBookmarksByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  const query = `
      SELECT bookmarks.*, posts.title, posts.content, posts.thumbnail, posts.views, users.familyName, users.givenName 
      FROM bookmarks 
      JOIN posts ON bookmarks.post_id = posts.post_id
      JOIN users ON bookmarks.user_id = users.id
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
