const router = require("express").Router();
const passport = require("passport");

const dotenv = require("dotenv");
const path = require("path");
const { getUsers } = require("../controllers/user");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/getUsers", isAuthenticated, getUsers);
module.exports = router;
