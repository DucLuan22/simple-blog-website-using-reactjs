const connection = require("../db");

exports.getPosts = async (req, res, next) => {
  const query = `
    SELECT posts.*, categories.category_name 
    FROM posts 
    JOIN categories ON posts.category_id = categories.category_id
  `;

  connection.query(query, (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ success: true, data: results });
  });
};

exports.getPostById = async (req, res, next) => {
  const { post_id } = req.params;
  const query = `
    SELECT posts.*, categories.category_name 
    FROM posts 
    JOIN categories ON posts.category_id = categories.category_id
    WHERE posts.post_id = ?
  `;

  connection.query(query, [post_id], (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.uploadPost = async (req, res, next) => {
  const { title, thumbnail, content, user_id, category_id } = req.body;

  const query =
    "INSERT INTO `posts` (`post_id`,`title`, `thumbnail`, `content`, `user_id`, `category_id`) VALUES (SUBSTRING(UUID(), 1, 12),?, ?, ?, ?, ?)";
  const values = [title, thumbnail, content, user_id, category_id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    const categoryName = "SELECT category_name FROM categories";
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

exports.getPostByIdAndUpdateViewCount = async (req, res, next) => {
  const { post_id } = req.params;

  console.log(post_id);
  // Start a transaction to ensure the two queries are executed together
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    const selectQuery = `
      SELECT posts.*, categories.category_name 
      FROM posts 
      JOIN categories ON posts.category_id = categories.category_id
      WHERE posts.post_id = ?
    `;

    connection.query(selectQuery, [post_id], (err, results, fields) => {
      if (err) {
        return connection.rollback(() => {
          res.status(400).json({ message: err.message });
        });
      }
      if (results.length === 0) {
        return connection.rollback(() => {
          res.status(404).json({ message: "Post not found" });
        });
      }

      const incrementViewsQuery = `
        UPDATE posts 
        SET views = views + 1 
        WHERE post_id = ?
      `;

      connection.query(
        incrementViewsQuery,
        [post_id],
        (err, updateResults, fields) => {
          if (err) {
            return connection.rollback(() => {
              res.status(400).json({ message: err.message });
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ message: err.message });
              });
            }
            res.status(200).json({ success: true, data: results[0] });
          });
        }
      );
    });
  });
};

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
