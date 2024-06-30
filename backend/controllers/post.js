const connection = require("../db");

exports.getPosts = async (req, res, next) => {
  connection.query("SELECT * FROM `posts`", (err, results, fields) => {
    if (results) return res.status(200).json({ success: true, data: results });
    res.status(400).json({ message: err });
  });
};

exports.uploadPost = async (req, res, next) => {
  const { title, thumbnail, content, user_id, category_id } = req.body;

  const query =
    "INSERT INTO `posts` (`title`, `thumbnail`, `content`, `user_id`, `category_id`) VALUES (?, ?, ?, ?, ?)";
  const values = [title, thumbnail, content, user_id, category_id];

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
      message: "Post uploaded successfully",
      data: {
        title,
        thumbnail,
        content,
        user_id,
        category_id,
      },
    });
  });
};
