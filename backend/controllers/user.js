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
  const { google_id, familyName, givenName, avatar_url, locale, email } =
    req.body;

  if (!google_id) {
    return res.status(400).json({
      success: false,
      message: "Google ID is required",
    });
  }

  // Insert user into the database
  const query =
    "INSERT INTO `users` (`google_id`, `familyName`, `givenName`, `avatar_url`, `locale`, `email`) VALUES (?, ?, ?, ?, ?,?)";
  const values = [
    google_id,
    familyName,
    givenName,
    avatar_url || null,
    locale,
    email,
  ];

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

exports.deleteUser = async (req, res, next) => {
  const { google_id } = req.params;

  if (!google_id) {
    return res.status(400).json({
      success: false,
      message: "Google ID is required",
    });
  }

  // Delete user from the database
  const query = "DELETE FROM `users` WHERE `google_id` = ?";

  connection.query(query, [google_id], (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });
};

exports.updateUser = async (req, res, next) => {
  const { google_id } = req.params;
  const { familyName, givenName, avatar_url, locale } = req.body;

  if (!google_id) {
    return res.status(400).json({
      success: false,
      message: "Google ID is required",
    });
  }

  // Update user information in the database
  const query = `
    UPDATE \`users\` 
    SET 
      familyName = ?, 
      givenName = ?, 
      avatar_url = ?, 
      locale = ?, 
      updated_at = NOW()
    WHERE 
      google_id = ?
  `;
  const values = [familyName, givenName, avatar_url || null, locale, google_id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        google_id,
        familyName,
        givenName,
        avatar_url,
        locale,
      },
    });
  });
};
