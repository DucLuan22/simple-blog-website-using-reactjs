const connection = require("../db");

exports.addCategory = async (req, res, next) => {
  const { categoryName } = req.body;

  const query = "INSERT INTO `categories` (`category_name`) VALUES (?)";
  const values = [categoryName];

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
      message: "Category added successfully",
      data: {
        categoryName,
      },
    });
  });
};

exports.getCategories = async (req, res, next) => {
  connection.query("SELECT * FROM `categories`", (err, results, fields) => {
    if (results) return res.status(200).json({ success: true, data: results });
    res.status(400).json({ message: err });
  });
};
