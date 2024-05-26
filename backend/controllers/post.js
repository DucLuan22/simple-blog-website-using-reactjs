const connection = require("../db");

exports.getPosts = async (req, res, next) => {
  connection.query("SELECT * FROM `posts`", (err, results, fields) => {
    if (results) return res.status(200).json({ success: true, data: results });
    res.status(400).json({ message: err });
  });
};
