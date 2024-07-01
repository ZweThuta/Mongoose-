const bcrypt = require("bcrypt");
const user = require("../models/user");
const User = require("../models/user");
exports.getRegisterPage = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

exports.registerAccount = (req, res) => {
  const { username, email, password } = req.body;
  // console.log(`Username is ${username}and Email is ${email} and Password is ${password}`);
  User.findOne({
    email,
  })
    .then((user) => {
      if (user) {
        return res.redirect("/register");
      }
      return bcrypt
        .hash(password, 10)
        .then((hashPass) => {
          return User.create({
            username,
            email,
            password: hashPass,
          });
        })
        .then((_) => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getLoginPage = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

exports.postLoginData = (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => { //boolean true or false
          if (isMatch) {
            req.session.isLogin = true;
            req.session.userInfo = user;
            return req.session.save((err) => {
              res.redirect("/");
              console.log(err);
            });
          }
          res.redirect("/login");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.logout = (req, res) => {
  req.session.destroy((_) => {
    res.redirect("/");
  });
};
