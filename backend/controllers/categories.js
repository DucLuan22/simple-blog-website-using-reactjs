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

exports.updateCategory = async (req, res, next) => {
  const { category_id } = req.params;
  const { categoryName } = req.body;

  const query =
    "UPDATE `categories` SET `category_name` = ? WHERE `category_id` = ?";
  const values = [categoryName, category_id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: {
        category_id,
        categoryName,
      },
    });
  });
};

exports.deleteCategory = async (req, res, next) => {
  const { category_id } = req.params;

  const query = "DELETE FROM `categories` WHERE `category_id` = ?";
  const values = [category_id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  });
};
