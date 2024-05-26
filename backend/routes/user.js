const router = require("express").Router();
const passport = require("passport");

const dotenv = require("dotenv");
const path = require("path");
const { getUsers, getUser, addUser } = require("../controllers/user");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/getUsers", isAuthenticated, getUsers);

router.get("/getUser", getUser);

router.post("/addUser", addUser);

module.exports = router;
