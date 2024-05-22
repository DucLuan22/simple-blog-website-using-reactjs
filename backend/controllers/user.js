const connection = require("../db");

exports.getUsers = async (req, res, next) => {
  connection.query("SELECT * FROM `users`", (err, results, fields) => {
    if (results) return res.status(200).json({ success: true, data: results });
    res.status(400).json({ message: err });
  });
};
