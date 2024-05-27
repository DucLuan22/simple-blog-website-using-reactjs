const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const isAuthenticated = require("./middlewares/isAuthenticated");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(
  cookieSession({ name: "session", keys: ["luan"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.WEBSITE_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api/user", userRoute);
app.listen("5000", () => {
  console.log("Server is running on port " + process.env.PORT);
});
