const connection = require("../db");

exports.getUsers = async (req, res, next) => {
  connection.query("SELECT * FROM `users`", (err, results, fields) => {
    if (results) return res.status(200).json({ success: true, data: results });
    return res.status(400).json({ message: err });
  });
};

exports.getUser = async (req, res, next) => {
  const googleId = req.query.google_id;

  if (!googleId) {
    return res
      .status(400)
      .json({ success: false, message: "Google is required" });
  }

  connection.query(
    "SELECT * FROM `users` WHERE `google_id` = ?",
    [googleId],
    (err, results, fields) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }

      if (results.length > 0) {
        return res.status(200).json({ success: true, data: results[0] });
      } else {
        return res.json({ success: false, message: "User not found" });
      }
    }
  );
};

exports.addUser = async (req, res, next) => {
  const { google_id, familyName, givenName, avatar_url, locale } = req.body;

  if (!google_id) {
    return res.status(400).json({
      success: false,
      message: "Google ID is required",
    });
  }

  // Insert user into the database
  const query =
    "INSERT INTO `users` (`google_id`, `familyName`, `givenName`, `avatar_url`, `locale`) VALUES (?, ?, ?, ?, ?)";
  const values = [google_id, familyName, givenName, avatar_url || null, locale];

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
      message: "User added successfully",
      data: {
        google_id,
      },
    });
  });
};
