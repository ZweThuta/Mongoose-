const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

const app = express();
const userRoutes = require("./routes/user");
const { adminRoutes } = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");

const store = new mongoStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store, 
  })
);

app.use((req, res, next) => {
  User.findById("66816b2fc80fa71fd05a714e").then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(authRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(8080);
    console.log("Connect to MongoDb");

    return User.findOne().then((user) => {
      if (!user) {
        User.create({
          username: "Hermes",
          email: "hermes27@gmail.com",
          password: "abcdefg",
        });
      }
      return user;
    });
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
