const router = require("express").Router();
const passport = require("passport");

const dotenv = require("dotenv");
const path = require("path");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { addCategory } = require("../controllers/categories");

router.post("/addCategory", isAuthenticated, addCategory);

module.exports = router;
